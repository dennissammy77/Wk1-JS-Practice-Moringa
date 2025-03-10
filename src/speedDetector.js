const prompt = require('prompt-sync')({sigint: true});

/**I am trying to understand classes.. */
class SpeedDetector{
    constructor(speedLimit=70,pointsPerSpeed=5,maxPoints=12){
        this.speedLimit = speedLimit;
        this.pointsPerSpeed = pointsPerSpeed;
        this.maxPoints = maxPoints;
    }

    checkSpeed(speed,license){
        if(speed <= this.speedLimit){
            console.log("Ok!")
            return;
        }
        let points = (speed - this.speedLimit)/this.pointsPerSpeed;

        console.log(`Demerit Points: ${points}`);
        registry.updateCarDemeritsPoints(license,points)

        if (points > 8 && points <= this.maxPoints) {
            console.log("Watch out! you are driving on a thin line.\n\nNext, ticket and your license is being suspended!");
        }
        if (points >= this.maxPoints) {
            console.log(`+--------------------------------------------------------------------------------------------------------+`);
            console.log("\nLicense Suspended and the car is being impounded!\n");
            console.log(`+--------------------------------------------------------------------------------------------------------+`);
            registry.suspendCar(license)
        }
    }
};

class CarRegistry{
    constructor(){
        this.database={
            0 : {
                owner: 'Dennis Sammy',
                demeritPoints: 0,
                licenseStatus: true,
                model: 'BMW'
            },
        }
    }
    findCar(license){
        if(!this.database[license]){
            console.log("Car is not in register!");
            return;
        }
        console.log(`\nLicense:${license}\t--|Owner: ${this.database[license]["owner"]}\t--|Demerit points: ${this.database[license]["demeritPoints"]}\t--|status:${this.database[license]["licenseStatus"]?'active':'suspended'}--|\n`);
    }
    addCar(license,owner,model){
        if(this.database[license]){
            console.log("Car already exists in register!");
            return;
        }
        this.database[license] = { owner, demeritPoints: 0, licenseStatus: true, model };
        console.log("Car registered successfully!");
    }
    listCars(){
        console.log(`\n+--------------------------------------------------------------------------------------------------------+`);
        console.log("Car Registry")
        console.log(`+--------------------------------------------------------------------------------------------------------+`);
        for(let car in this.database){
            console.log(`\nLicense:${car}\t--|Owner: ${this.database[car]["owner"]}\t--|Demerit points: ${this.database[car]["demeritPoints"]}\t--|status:${this.database[car]["licenseStatus"]?'active':'suspended'}--|\n`);
        }
    }
    suspendCar(license){
        if(!this.database[license]){
            console.log("Car is not in register!");
            return;
        }
        this.database[license]["licenseStatus"] = false
    }
    updateCarDemeritsPoints(license,demeritPoints){
        if(!this.database[license]){
            console.log("Car is not in register!");
            return;
        }
        this.database[license]["demeritPoints"] += demeritPoints
    }
};

const registry = new CarRegistry()
while(true){
    console.clear();
    console.log('+---------------------------+NYPD CAR**SPEED**SYSTEM!!+---------------------------+');

    console.log('\n Systems Menu')
    console.log('\n 1. Speed Tracker')
    console.log('\n 2. List cars from registry')
    console.log('\n 3. Register a car')
    console.log('\n 4. Verify car')
    console.log('\n 5. Exit');

    const choiceMenu = parseInt(menuPrompter());
    if(choiceMenu === 1){
        console.log(`+--------------------------------------------------------------------------------------------------------+`);
        const carLicense = prompt('What is the car license Number or type "N/A"?  ').trim();
        console.log(`+--------------------------------------------------------------------------------------------------------+`);
        const carSpeed = prompt('How Fast were you going?  ').trim();
        console.log(`+--------------------------------------------------------------------------------------------------------+`);
        const tracker = new SpeedDetector();
        tracker.checkSpeed(carSpeed,carLicense)
        prompt("\nPress Enter to continue...");
    }
    if(choiceMenu === 2){
        registry.listCars();
        prompt("\nPress Enter to continue...");
    }
    if(choiceMenu === 3){
        const carLicense = promptHandler("\nEnter car license,(e.g AWD 1234)");
        const carOwnerName = promptHandler("\nEnter car owner,(e.g John Doe)");
        const carModel = promptHandler("\nEnter car model,(e.g BMW)");
        registry.addCar(carLicense,carOwnerName,carModel);
        prompt("\nPress Enter to continue...");
    }
    if(choiceMenu === 4){
        const carLicense = promptHandler("\nEnter car license,(e.g AWD 1234)").trim();
        registry.findCar(carLicense);
        prompt("\nPress Enter to continue...");
    }
    if(choiceMenu === 5){
        const newDetectionPrompt = prompt("Are you sure you want to exit?Type 'Y' exit or 'N' to continue.  ").trim();
        if(newDetectionPrompt.toLowerCase() === 'y'){
            process.exit(0); // Forcefully stops the script
        }
    }
};

function menuPrompter(){
    const choiceMenu = prompt('Select from menu [1, 2, 3, 4, 5]: ').trim();
    if(!choiceMenu){
        console.log('\n You did not enter anything: ')
        menuPrompter()
    }
    if(choiceMenu.includes([1,2,3,4])){
        console.log('\n Your choice does not exist: ')
        menuPrompter()
    }
    if(isNaN(choiceMenu)){
        console.log('\n Your choice should be a number: ')
        menuPrompter()
    }
    return choiceMenu;
}
function promptHandler(message){
    const input = prompt(`${message}: `).trim();
    if(!input){
        console.log('You did not enter anything: ')
        promptHandler(message)
    }
    return input;
}