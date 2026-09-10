'use strict';
function roiScenario({courses,hours,rate,investment,operating}) {
  const values=[courses,hours,rate,investment,operating];
  if(values.some(x=>typeof x!=='number'||!Number.isFinite(x)||x<0)||!Number.isInteger(courses))return null;
  const capacity=courses*hours,gross=capacity*rate,net=gross-investment-courses*operating,perCourse=hours*rate-operating;
  if(![capacity,gross,net,perCourse].every(Number.isFinite))return null;
  const roi=investment>0?net/investment*100:null,breakEven=perCourse>0?Math.ceil(investment/perCourse):investment===0?0:null;
  if([roi,breakEven].some(x=>x!==null&&!Number.isFinite(x)))return null;
  return {capacity,gross,net,roi,breakEven};
}
if(typeof module!=='undefined')module.exports={roiScenario};
if(typeof document!=='undefined') {
  const form=document.getElementById('roi-form'),result=document.getElementById('roi-result');
  const money=x=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(x);
  form.addEventListener('submit',event=>event.preventDefault());
  form.addEventListener('input',()=>{
    const values={};
    for(const input of form.querySelectorAll('input')) {
      if(input.value.trim()===''||!input.validity.valid){result.textContent='Enter all five nonnegative assumptions; courses must be a whole number.';return;}
      values[input.name]=Number(input.value);
    }
    const model=roiScenario(values);
    if(!model){result.textContent='These inputs cannot produce a finite scenario. Check the values.';return;}
    result.replaceChildren();
    const title=document.createElement('strong');title.textContent='Your scenario · not a realized return';result.append(title);
    const list=document.createElement('dl');
    for(const [label,value] of [['Capacity released',model.capacity.toLocaleString('en-US')+' hours'],['Gross effort value',money(model.gross)],['Net modeled benefit',money(model.net)],['Modeled ROI',model.roi===null?'Not defined with zero build investment':model.roi.toFixed(1)+'%'],['Break-even',model.breakEven===null?'Not reached at these assumptions':model.breakEven+' courses']]) {
      const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;list.append(dt,dd);
    }
    result.append(list);
  });
}

if(typeof module!=='undefined' && require.main===module) {
  const assert=require('node:assert/strict'), r=roiScenario;
  assert.deepEqual(r({courses:4,hours:10,rate:100,investment:1000,operating:100}),{capacity:40,gross:4000,net:2600,roi:260,breakEven:2});
  assert.equal(r({courses:4,hours:0,rate:100,investment:1000,operating:100}).breakEven,null);
  assert.equal(r({courses:0,hours:0,rate:0,investment:0,operating:0}).roi,null);
  for(const courses of [-1,NaN,Infinity,'4',null,true,1.5])assert.equal(r({courses,hours:1,rate:1,investment:1,operating:1}),null);
  assert.equal(r({courses:1,hours:1,rate:1e308,investment:1e-308,operating:0}),null);
  console.log('PASS: ROI scenario, loss, zero investment and invalid/overflow inputs.');
}
