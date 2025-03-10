# Wk1-JS-Practice-Moringa
## Contents
1. Overview
2. Project Architecture
3. SetUp
4. Running Project
5. Solution 1: Student Grade Generator
6. Solution 2: Speed Detector
7. Solution 3: Net Salary Calculator

## 1. Overview
This project entails the solutions for the practice challenges, I took this opportunity to learn prompts on terminal, while loops, classes and TAXES!! I had fun solving the problems, I hink I might have overdone it but it was worthwhile.

## 2. Project Architecture
| root
|-/node_modules
|-/src
|--studentGradeGenerator.js
|--speedDetector.js
|--NetSalaryGenerator.js
|-.gitignore
|-package-lock.json
|-package.json
|-README.md <- You are here


## 3. Setup
```
git clone https://github.com/dennissammy77/Wk1-JS-Practice-Moringa.git

npm install

```

## 4. Running Projects
- Select the project located at src
- To run a solution, 
```
node <project_file.js>
```

## 5. Solution 1: Student Grade Generator
Location: `/src/studentGradeGenerator.js`
run: `node studentGradeGenerator.js`
`gradeReportObject` - object to hold the student data.
```Json
    course: '', 
    studentName: '',
    numberOfSubjects: 0,
    subjects: [],
```
`getstudentName` - Handles input to get name input
`getstudentCourse` - Handles input to get course input
`getNumberOfSubjects` - Handles input to get number of subjects input
`GenereateReportCard` - consoles out the report card
`StudentGradeGenerator` - Assigns the appropriate grade

what i learnt while loops and prompts

## 6. Solution 2: Speed Detector
Location: `/src/speedDetector.js`
run: `node speedDetector.js`

`SpeedDetector` - class to check the speed of a car, assign demerit points and give feedback.
```Js
class SpeedDetector{
    constructor(speedLimit=70,pointsPerSpeed=5,maxPoints=12){
        this.speedLimit = speedLimit;
        this.pointsPerSpeed = pointsPerSpeed;
        this.maxPoints = maxPoints;
    }

    checkSpeed(speed,license){
        // checks speed
        // assign demerit points
    }
};
```
`CarRegistry` - this class contains the methods to find, register, update, list cars
```Js
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

    }
    addCar(license,owner,model){

    }
    listCars(){

    }
    suspendCar(license){

    }
    updateCarDemeritsPoints(license,demeritPoints){

    }
};
```

`menuPrompter` - function to handle menu inputs.
`promptHandler` - function to handle prompts.

what i learnt classes

# 7. Solution 3: Net Salary Calculator
Location: `/src/NetSalaryCalculator.js`
run: `node NetSalaryCalculator.js`

## Instruction
calculate net salary

`salaryCalculator` - class to calculate net salary.
```Js
class salaryCalculator{
    constructor(basicSalary,benefits,allowances,alternativePensionScheme,disabilityExemption,insuranceRelief){
        this.basicSalary = basicSalary;
        this.benefits = benefits;
        this.allowances = allowances;
        this.alternativePensionScheme = alternativePensionScheme;
        this.disabilityExemption = disabilityExemption;
        this.insuranceRelief = insuranceRelief;
        this.pensionablePayTiers = {
            tier1: {
                min: 0,
                max: 8000
            },
            tier2: {
                min: 8001,
                max: 72000
            }
        }
        this.relief={
            personalRelief: 2400,
            disabilityExemption: 150000,
        }
        this.rateTax = {
            10: {min: 0, max: 24000, mux: 10},
            25: {min: 24001, max: 32333, mux: 25},
            30: {min: 32334, max: 500000, mux: 30},
            32.5: {min: 500001, max: 800000, mux: 32.5},
            35: {min: 800000, max: Infinity, mux: 35},
        }
    }
    grossCalculator(){
        
    };
    /*Deductions*/
    NSSFCalculator(){

    };
    SHIFCalculator(){

    };
    taxablePayCalculator(){

    };
    /*Tax*/
    payeeTaxCalculator(){

    };
    netSalaryCalculator(){

    };
    displayBreakdown() {

    }
};
```
input prompts: `baseSalaryPrompter`,`benefitsPrompter`,`allowancesPrompter`,`insuranceReliefPrompter`,`alternativePensionSchemePrompter`,`disabilityExemptionPrompter`

What I learnt Taxes, Classes
