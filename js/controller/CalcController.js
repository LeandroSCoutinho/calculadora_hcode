class CalcController {
    
    constructor(){
        this._lastOperator ='';
        this._lasNumber = '';

        this._operation = [];
        this.locale = "pt-BR";
        this._displayCalEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this.currentDate;
        this.initialize();
        this.initButtonsEvents();
        
    }

        initialize(){

            this.setDisplayDateTime();

            setInterval(()=>{
            
                this.setDisplayDateTime();
 
            },1000);

            this.setLastNumberToDisplay();
            
        }

        addEventListenerAll(element, events,fn){

            events.split(' ').forEach(event=>{
                
                element.addEventListener(event,fn,false);
            
            });
                            
        }

        clearAll(){
            this._operation = [];
            this._lasNumber = '';
            this._lastOperator = '';

            this.setLastNumberToDisplay();
        }

        clearEntry(){
             this._operation.pop();

             this.setLastNumberToDisplay();
        }

        setError(){
            this.displayCalc = "error";
        }

        getLastOperation(){
            return this._operation[this._operation.length - 1];
        }

        setLastOperation(value){

            this._operation[this._operation.length - 1] = value;

        }

        isOperator(value){

            return (['+','-','/','*','%'].indexOf(value) > -1);

        }

        getResult(){

            return eval(this._operation.join(''));
        }

        calc(){

            let last = '';

            this._lastOperator = this.getLastItem();

            if(this._operation.length < 3){

                let firstItem = this._operation[0];
                this._operation = [firstItem, this._lastOperator, this._lastNumber];
            }

            if(this._operation.length > 3){

                last = this._operation.pop();

                this._lastNumber = this.getResult();

            } else if(this._operation.length == 3){

                this._lastNumber = this.getLastItem(false);

            }
            
            let result =this.getResult();

            if(last == "%"){

                result /= 100;

                this._operation = [result];

            }else{

                this._operation = [result];

                if(last) this._operation.push(last);
                
            }

            this.setLastNumberToDisplay();
        }

        pushOperation(value){

            this._operation.push(value);

            if(this._operation.length > 3){
             
                 this.calc();

            }else{


            }
        }

        getLastItem(isOperator = true){

            let lastItem;

            for(let i = this._operation.length - 1; i >= 0; i--){
                    
                if(this.isOperator(this._operation[i]) == isOperator){
                    lastItem = this._operation[i];
                    break;
                }

                
            }
            
            if(!lastItem){
            
                lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
            }

            return lastItem;

        }

        setLastNumberToDisplay(){

            let lastNumber = this.getLastItem(false);

            if(!lastNumber) lastNumber = 0;
            
            this.displayCalc = lastNumber;

        }

        addOperator(value){

            if(isNaN(this.getLastOperation())){

               if(this.isOperator(value)){

                    this.setLastOperation(value);

               }else{

                    this.pushOperation(value);

                    this.setLastNumberToDisplay();

               }

            }else{

                if(this.isOperator(value)){

                    this.pushOperation(value);

                }else{

                    let newValue = this.getLastOperation().toString() + value.toString();
                    this.setLastOperation(parseFloat(newValue));

                    this.setLastNumberToDisplay();

                }
            }
             
        }

        addDot(){

            let lastOperation = this.getLastOperation();

            if(this.isOperator(lastOperation) || !lastOperation){
                this.pushOperation('0.');
            }else{
                this.setLastOperation(lastOperation.toString() + '.');
            }

            this.setLastNumberToDisplay();

        }

        execBtn(value){

            switch(value){
                case 'ac':
                    this.clearAll();
                    break;
                case 'ce':
                    this.clearEntry();
                    break;
                case 'soma':
                    this.addOperator('+');
                    break;
                case 'subtracao':
                    this.addOperator('-');
                    break;
                case 'multiplicacao':
                    this.addOperator('*');
                    break;
                case 'divisao':
                    this.addOperator('/');
                    break;   
                case 'porcento':
                    this.addOperator('%');
                        break;    
                case 'igual':
                    this.calc();
                    break;
                case 'ponto':
                    this.addDot();
                    break;
                default:
                    this.setError();
                    break;
                
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':    
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperator(parseInt(value));
                    break;
            }
        }

        initButtonsEvents(){
            let buttons = document.querySelectorAll("#buttons > g, #parts > g");

            buttons.forEach((btn, index)=>{

                this.addEventListenerAll(btn,"click drag", e=>{

                    let textBtn = btn.className.baseVal.replace("btn-","");

                    this.execBtn(textBtn)

                });

                this.addEventListenerAll(btn, "mouseover mouseup mousedown",e=>{
                    btn.style.cursor = "pointer";
                })
            });
        }

        setDisplayDateTime(){

            this.displayDate = this.currentDate.toLocaleDateString(this.locale, {
                day: "2-digit",
                month: "long",
                year: "numeric"
            });
                
            this.displayTime = this.currentDate.toLocaleTimeString(this.locale);

        }



        get displayDate(){
            return this._dateEl.innerHTML;
        }

        set displayDate(date){
            this._dateEl.innerHTML = date;
        }

        get displayTime(){
            return this._timeEl.innerHTML;
        }

        set displayTime(time){
            this._timeEl.innerHTML = time; 
        }

        get displayCalc(){
            return this._displayCalcEl.innerHTML;
        }

        set displayCalc(value){
            this._displayCalEl.innerHTML = value; 
        }

        get currentDate(){
            return new Date();
;
        }

        set currentDate(date){
            this._currentDate = date;
        }
}