class CalcController {
    
    constructor(){
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
            
        }

        addEventListenerAll(element, events,fn){

            events.split(' ').forEach(event=>{
                
                element.addEventListener(event,fn,false);
            
            });
                            
        }

        clearAll(){
            this._operation = [];
        }

        clearEntry(){
             this._operation.pop();
        }

        setError(){
            this.displayCalc = "error";
        }

        addOperator(value){
            this._operation.push(value); 
            console.log(this._operation);
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
                    
                    break;
                case 'soma':
                    
                    break;
                case 'subtracao':
                    
                    break;
                case 'multiplicacao':
                    
                    break;
                case 'divisao':
                    
                    break;   
                case 'porcento':
                    
                        break;    
                case 'igual':
                    
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