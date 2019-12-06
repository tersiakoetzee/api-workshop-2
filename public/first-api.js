document.addEventListener("DOMContentLoaded", function () {

   const addBtn = document.querySelector('.addTo');
   const showBtn = document.querySelector('.show');

   const brandsElem = document.querySelector(".brands");
   const brandListTemplateElem = document.querySelector(".brandListTemplate");
   const brandListTemplate = Handlebars.compile(brandListTemplateElem.innerHTML);

   const colorElem = document.querySelector(".colors");
   const colorListTemplateElem = document.querySelector(".colorListTemplate");
   const colorListTemplate = Handlebars.compile(colorListTemplateElem.innerHTML);

   const carElem = document.querySelector(".filtered");
   const carsListTemplateElem = document.querySelector(".carListTemplate");
   const carListTemplate = Handlebars.compile(carsListTemplateElem.innerHTML);

   const btn = document.querySelector('.filterBtn')

   axios.get('http://api-tutor.herokuapp.com/v1/cars/make')
      .then(results => {
         const response = results.data;
         let makes = response.map((item) => {
            return item.make;
         })
         brandsElem.innerHTML = brandListTemplate({
            brands: makes
         })


      })

   axios.get('http://api-tutor.herokuapp.com/v1/cars/colors')
      .then(results => {
         const response = results.data;
         let colors = response.map((item) => {
            return item.color;
         })
         colorElem.innerHTML = colorListTemplate({
            colors: colors
         })
      })

   btn.addEventListener('click', function (e) {
      e.preventDefault();

      var brand = document.getElementById("brand");
      var selectedBrand = brand.options[brand.selectedIndex].value;

      var color = document.getElementById("color");
      var selectedColor = color.options[color.selectedIndex].value;

      if (selectedBrand && selectedColor) {
         axios.get(`http://api-tutor.herokuapp.com/v1/cars/make/${selectedBrand}/color/${selectedColor}`)
            .then(results => {
               const response = results.data;
               console.log(selectedColor);

               carElem.innerHTML = carListTemplate({
                  cars: response
               })
            })
            .catch((err) => {
               console.log(err)
            })
      }
      else if (selectedBrand) {

         axios.get('http://api-tutor.herokuapp.com/v1/cars/make/' + selectedBrand)
            .then(results => {
               const response = results.data;

               carElem.innerHTML = carListTemplate({
                  cars: response
               })
            })
            .catch((err) => {
               console.log(err)
            })
      } else if (selectedColor) {
         axios.get('http://api-tutor.herokuapp.com/v1/cars/color/' + selectedColor)
            .then(results => {
               const response = results.data;

               carElem.innerHTML = carListTemplate({
                  cars: response
               })
            })
            .catch((err) => {
               console.log(err)
            })
      }
   });

   let favourites = [];

   addBtn.addEventListener('click', (e) => {
      const selected = Array.from(document.querySelectorAll(".favourite:checked"));
      const selectedCars = selected.map(elem => elem.id)
      var allCars;
      axios.get('http://api-tutor.herokuapp.com/v1/cars')
         .then(results => {
            const allCars = results.data;

            for (let i = 0; i < allCars.length; i++) {
               const item = allCars[i]; 
               for (let j = 0; j < selectedCars.length; j++) {
                  let elem = selectedCars[j]
                  if(item.reg_number == elem) {
                     axios.post('http://localhost:3022/api/favorites', item)
                     .then( (info) => {
                        console.log(info);
                        
                     });
                  }   
               }
            }
         })

      
      e.preventDefault();
   });

   showBtn.addEventListener('click', (e) => {
      axios.get('http://localhost:3022/api/favorites')
      .then(results => {
         const response = results.data;
console.log(response);

         carElem.innerHTML = carListTemplate({
            cars: response.data
         })
      })
      .catch((err) => {
         console.log(err)
      })


      e.preventDefault();
   });



});

