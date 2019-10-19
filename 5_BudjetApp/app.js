// module SAFE by IIFE

// Budget Controller
var budgetController = (function() {

  var Expense = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
      this.percentage = -1;
  }

  Expense.prototype.calcPercentages = function(totalIncome) {

    if (totalInc > 0){
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }

  };

  Expense.prototype.getPercentage = function() {
    return this.percentage;
  };


  var Income = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
  };

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(cur) {
        sum += cur.value;
    /*
    0
    [200, 400, 100]
    sum = 0 + 200
    sum = 200 + 400
    */
    });
    data.totals[type] = sum;
  }

  var data = {
    allItems: {
      exp: [],
      inc: []
    },

    totals: {
      exp: 0,
      inc: 0
    },

    budget: 0,
    percentage: -1
  };

  return {
    addItem: function(type, des, val){
      var newItem, ID;

      //[1, 2, 3, 4, 5], next ID = 6
      //[1, 3, 4, 5, 8], next ID = 9 ???what can i do???
      // ID = last ID + 1

      //create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // create new item based on 'inc' or 'exp' type
      if(type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      // push it into our data structure
      data.allItems[type].push(newItem);

      //return the new element
      return newItem;
    },

    deleteItem: function(type, id) {
      var ids, index;

      // id = 6
      //data.allItems[type][id];
      //ids = [1, 3, 4, 6, 8]
      //index = 3

      var ids = data.allItems[type].map(function(current) {
        return current.id;
      });

      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }

    },

    calculateBudget: function() {

      // calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');

      // calculate the budget: income -expenses
      data.budget = data.totals.inc - data.totals.exp;

      //calculate the percentage of income that we spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);

      } else {
        data.percentage = -1;
      }

      //Expense = 100 and income 200, spend 50% = 100/200=0.5*100

    },

    calculatePercentages: function() {
      /*
      a=20
      b=10
      c=40
      income = 100
      a=20/100=20%
      b=10/100=10%
      c=40/100=40%
      */
      data.allItems.exp.forEach(function(cur) {
        current.calcPercentages();
      });
    },


    getPercentages: function() {
      var allPerc = data.allItems.exp.map(function() {
        return cur.getPercentage();
      });
      return allPerc;
    },


    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }
    },

    testing: function() {
      console.log(data);
    }
  };

})();












// UI controller
var UIController = (function(){

  var DOMStrings = {
    inputType:         '.add__type',
    inputDescription:  '.add__description',
    inputValue:        '.add__value',
    inputBtn:          '.add__btn',
    incomeContainer:   '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel:       '.budget__value',
    incomeLabel:       '.budget__income--value',
    expensesLabel:     '.budget__expenses--value',
    percentageLabel:   '.budget__expenses--percentage',
    container:         '.container'
  }

  return {
    getInput: function() {

      return {
        type:        document.querySelector(DOMStrings.inputType).value, // will be either "inc" or "exp"
        description: document.querySelector(DOMStrings.inputDescription).value,
        value:       parseFloat(document.querySelector(DOMStrings.inputValue).value)
      };
    },

    addListITem: function(obj, type) {

        var html, newHtml, element;

        //create HTML string with placeholder text

        if (type === 'inc') {
          element = DOMStrings.incomeContainer;

          html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

        } else if (type === 'exp') {
          element = DOMStrings.expensesContainer;

          html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }

      //Replace the placeholder text with some actual data

        newHtml = html.replace('%id%', obj.id);
        newHtml = newHtml.replace('%description%', obj.description);
        newHtml = newHtml.replace('%value%', obj.value);


      //insert the HTML into the DOM
        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

    },

    deleteListItem: function(selectorID) {

      var el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);

    },

    clearFields: function(){
      var fields, fieldsArr;

      fields = document.querySelectorAll
              (DOMStrings.inputDescription + ',' + DOMStrings.inputValue);

      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(current, index, array) {
        current.value = "";
      });

      fieldsArr[0].focus();

    },

    displayBudget: function(obj) {

      document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMStrings.expensesLabel).textContent = obj.totalExp;

      if (obj.percentage > 0) {
        document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMStrings.percentageLabel).textContent = '---';
      }

    },

    getDOMStrings: function() {
      return DOMStrings;
    }

  };

})();










// Global App controller
var controller = (function(budgetCtrl, UICtrl) {

  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMStrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event){
      if(event.keyCode === 13 || event.which === 13){
        ctrlAddItem();
      }
    });

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

  };


  var updateBudget = function() {
      // 5. Calculate the budget
      budgetCtrl.calculateBudget();

      // 5' return the budget
      var budget = budgetCtrl.getBudget();

      // 6. Display the budget on the UI
      // console.log(budget);
      UICtrl.displayBudget(budget);

  };

  var updatePercentages = function(){

    // 1, calculate percentages
    budgetCtrl.calculatePercentages();

    // 2. read percentages from the budget controller
    var percentages = budgetCtrl.getPercentage();

    // 3. update the UI with the new percentages


  };

  var ctrlAddItem = function() {
      // console.log('OK');

      var input, newItem;

      // 1. Get the field input data
      input = UICtrl.getInput();
      // console.log(input);

      if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

      // 2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // 3. Add the item to the UI
      UICtrl.addListITem(newItem, input.type);

      // 3' clear the fields
      UICtrl.clearFields();

      // 4. calculate and update budget
      updateBudget();

      // 4' calculate and update percentages
      updatePercentages();

    }

  };

  var ctrlDeleteItem = function(event) {
    var itemID, splitID, type, ID;

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if(itemID) {

      //inc-1
      splitID = itemID.split('-');
      type = splitID[0];
      ID = parseInt(splitID[1]);

      // 1, delete the item from the data structure
      budgetCtrl.deleteItem(type, ID);

      // 2, delete the item from the UI
      UICtrl.deleteListItem(itemID);

      // 3, Update and show the new budget
      updateBudget();

      // 3' calculate and update percentages
      updatePercentages();


    }

  };

  return {
    init: function(){
      console.log ('APPLICATION has STARTed!');
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  }

})(budgetController, UIController);


controller.init();