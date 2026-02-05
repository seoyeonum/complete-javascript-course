'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map;
  #mapEvent;

  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this)); // bind.this 를 통해 수동으로 현재 객체(app)와 결합
    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    // ※ Geolocation API
    if (navigator.geolocation) {
      // 두 함수는 각각 응답 성공 시와 실패 시의 callback 함수이다.
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this), // .bind(this) 를 통해 수동으로 현재 객체(App) 결합
        function () {
          alert('Could not get your position');
        },
      );
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(`https://www.google.pt/maps/@${latitude},${longitude}`); // → 37.4031765 126.985908

    const coords = [latitude, longitude];
    console.log(this);
    this.#map = L.map('map').setView(coords, 13); // 뒤쪽 숫자는 zoom level
    // console.log(map);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this)); // .bind(this) 를 통해 수동으로 현재 객체(App) 결합
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    // Clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    // Display marker
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        }),
      )
      .setPopupContent('Workout')
      .openPopup();
  }
}

const app = new App();
