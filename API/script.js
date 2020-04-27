const app = new Vue({
    el: '#main',
   
    data: {
        result: " ",
        responseAvailable: false,
        apiKey: "bea6bf1fc1msh57afc2b9d0d3fbap18fb37jsn77f0a1a29c2b",
		origin: " ",
		query: "https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/cheap?destination=-&origin=MCO&currency=USD&page=None"
    },
    
	methods: {
       
	   obtainOrigin( ) {
			this.origin = this.$refs.input.value;
			console.log(this.origin);
	   
	   },
	
		
		fetchAPIData( ) { 

			//this.responseAvailable = false;
			fetch( this.query.replace("MCO", this.origin), {
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com",
					"x-rapidapi-key": this.apiKey,
					"x-access-token": "d416671c48bbabfbf236722a507b2c53"
				}
			})
			.then(response => { 
				if(response.ok){
					this.responseAvailable = true
					return response.json()    
				} else{
					alert("Server returned " + response.status + " : " + response.statusText);
				}                
			})
			.then(response => {
				this.result = response.data
								console.log(response.data)
								var element = document.createElement('a');
								element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(response.data)));
								console.log(this.origin)

								var currentDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
								console.log(currentDate);

								var fileName = "flight_data_from_MCO_date.json".replace("MCO", this.origin)
								element.setAttribute('download', fileName.replace("date", currentDate) );

								element.style.display = 'none';
								document.body.appendChild(element);

								element.click();

								document.body.removeChild(element);
				this.responseAvailable = true;
			})

			.catch(err => {
				console.log(err);
			});


        }
    }
})