// inicjalizacja potrzebnych zmiennych
const plotno = document.getElementById("plotno");
const ctx = plotno.getContext("2d");
const rerun_button = document.querySelector("#rerun_button");
let bars = [];
let data = [
    {value: 280}
]
let isRunning = false;
let risetime = document.getElementById("stimer").value;

// dodajemy obsługę zdarzenia dla przycisku
document.addEventListener("DOMContentLoaded", function() {
    
    rerun_button.addEventListener("click", (event) =>{
        start();
    });
});

function start(){
    isRunning = true;
    // resetowanie tablicy słupków
    // zmienna spacing służy do przesuwania kolejnych słupków poziomie, tak aby były odstępy między nimi
    bars = [];
    let spacing = 0;
    data.forEach(element => {
        let bar = new Bar(target_height=element.value)
        bar.x+=spacing;
        bars.push(bar);
        spacing+=110;
    });
    update();
}

function stop(){
    isRunning = false;
}

function update(){
    if(isRunning){
        //czyszczenie płótna
        ctx.clearRect(0, 0, plotno.width, plotno.height);
        // dla każdego słupka
        bars.forEach(bar => {
            bar.draw(ctx);
        });
        // inne funkcje zmieniające stan klatki do wyrysowania
        // można też sprawdzic czy wszystkie są już narysowane
        // tutaj można by wykorzystać wzorzec obserwator
        requestAnimationFrame(update);
    }
}

// klasy na potrzeby rozwiązania
// takie rozwiązanie spowoduje możliwość ponownego wykorzystania kodu i hermetyzacji części funkcji

class Bar {
    constructor(target_height=200, label='bar 1', width=100, color='#445599'){
        this.x = 10;
        // tutaj powinno byc bardziej uniwersalne rozwiązanie, np. klasa wykres z parametrami swojego położenia
        this.y = plotno.height-10;
        // zmiana wysokości słupka na klatkę (lub pojedyncze wywołanie metody _update)
        this.color = color;
        this.height = 0;
        this.width = width;
        this.isDrawn = false;
        this.label = label;
        this.target_height = target_height;
		this.dy = target_height/(100*risetime);
    }

    // rysowanie słupka i etykiety
    draw(ctx){
        
        // kod rysujący
        ctx.fillStyle = this.color;
        //pamiętajmy o domyślnej orientacji współrzędnych płótna i położeniu punktu (0,0)
        ctx.fillRect(this.x, this.y, this.width, -this.height);
        ctx.fillStyle = '#000';
        ctx.font = "20px Georgia";
        // etykieta 5px ponad słupkiem
        this._update();
    }

    // metoda aktualizująca parametry słupka
    // wersja ES2019 wprowadziła prywatne pola i metody klasy. Należy wtedy rozpoczać nazwę od znaku #
    // np. #update
    // jeżeli nie ma możliwości użyć tej wersji możemy skorzystać z konwencji, w której aby wskazać 
    // prywatne składowe klasy rozpoczynamy nazwy od _, jednak to tylko informacja dla innych użytkowników
    // naszego kodu a nie faktyczna zmiana dostępu do składowej
    _update(){
        // jeżeli jesteśmy już blisko docelowej wysokości - zwalniamy szybkość rysowania słupka
        // #TODO tu dla lepszego efektu można zastosować funkcję kwadratową a nie liniową
        
        if(this.height < this.target_height){
            this.height+=this.dy;
        }
        // narysowany - można wykorzystać do wykonania jakichś czynności, jeżeli słupek lub wszystkie
        // słupki są już w pełni narysowane
        else{
            this.isDrawn = true;
        }
    }
}