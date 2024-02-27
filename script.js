const pricePerUnit = 100;
const units = [
    {
        unit: 1,
        discount: 10,
    },
    {
        unit: 2,
        discount: 20,
    },
    {
        unit: 3,
        discount: 30,
    },
];

let html = ``;
for (const x of units) {
    const numberOfUnits =[];
    for(let i=0; i<x.unit;i++){
        numberOfUnits.push(i+1);
    }
    let finalValue =
        x.unit * pricePerUnit - (x.unit * pricePerUnit * x.discount) / 100;
    let roundedNumber = finalValue.toFixed(0);
    finalValue = parseFloat(roundedNumber);

    html += `${x.unit == 2 ? '<div class="image-container"><img src="Rectangle 9394.png" class="first-image-in-sec2" alt="imgage1"><img src="Rectangle 9393.png" class="second-image-in-sec2" alt="imgage2"><div class="text-on-image">Most Popular</div></div>' : ''}
    <section id="unitSection${x.unit}" class="unit-section-${x.unit == 1 ? 'open' : 'close'}">
  <div class="display-flex mt-3">
  ${x.unit == 1 ? '<input type="radio" checked' : '<input type="radio"'}
    class="radio-style" onClick="getSelectedValue()" id="${x.unit
        }" name="unit-radio-group" value="${finalValue}"/>
    <div class="col">
      <div class="row">
        <div class="unit-number">${x.unit} Unit</div>
        <div class="percentage-off-box">
          <div class="percentage-off-text">${x.discount}% Off</div>
        </div>
      </div>
      <div class="row standard-price-text">Standard Price</div>
    </div>
    <div class="justify-content-end">
      <div class="col">
        <div class="row final-value">$${finalValue} USD</div>
        <div class="row standard-price-value">$${pricePerUnit * x.unit} USD</div>
      </div>
    </div>
  </div>

  <div class="ml-4 mt-2 ${x.unit == 1 ? '' : 'display-hide'}" id="expandableComponent${x.unit}">
        
        <table class="mt-2  ml-4">
            <tr>
                <th class="text-style"> </th>
                <th class="text-style">Size</th> 
                <th class="text-style">Colour</th>
            </tr>
            ${numberOfUnits.map((value) =>
                `<tr>
                    <td class="number-style">#${value}</td>
                    <td>
                        <select class="select-style" id="selectOption" onchange="selectChangeHandler()">
                            <option class="text-style" value="option1">S</option>
                            <option class="text-style" value="option2">M</option>
                            <option class="text-style" value="option3">L</option>
                        </select>
                    </td>
                    <td>
                        <select class="select-style" id="selectOption" onchange="selectChangeHandler()">
                            <option class="text-style" value="option1">Black</option>
                            <option class="text-style" value="option2">White</option>
                            <option class="text-style" value="option3">Green</option>
                        </select>
                    </td>
                </tr>`).join('')}
        </table>
    </div>   
</section>`;
}
document.getElementById("secondSection").innerHTML = html;

let initialTotalValueHtml = `Total : $${getSelectedValue()} USD`;
document.getElementById("totalText").innerHTML = initialTotalValueHtml;

function getSelectedValue() {
    let totalValueHtml = `Total : $`;
    const form = document.getElementById("unitForm");
    const radioButtons = form.elements["unit-radio-group"];
    let returnValue;
    for (const radioButton of radioButtons) {
        const unitSectionId = `unitSection${radioButton.id}`;
        const expandableComponentId = `expandableComponent${radioButton.id}`;
        if (!radioButton.checked) {
            document.getElementById(unitSectionId).className = "unit-section-close";
            document.getElementById(expandableComponentId).className = "display-hide";
        }
        if (radioButton.checked) {
            document.getElementById(unitSectionId).className = "unit-section-open";
            document.getElementById(expandableComponentId).className = "";
            totalValueHtml += `${radioButton.value} USD`;
            document.getElementById("totalText").innerHTML = totalValueHtml;
            returnValue = radioButton.value;
        }
    }
    return returnValue;
}
