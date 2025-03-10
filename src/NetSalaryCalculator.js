const prompt = require('prompt-sync')({sigint: true});

class salaryCalculator{
    constructor(basicSalary,benefits,allowances,alternativePensionScheme=false,disabilityExemption=false,insuranceRelief){
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
        this.pensionablePay={
            tier1: 0,
            tier2: 0,
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
        return parseFloat(parseInt(this.basicSalary) + parseInt(this.allowances)).toFixed(2);
    };
    /*Deductions*/
    NSSFCalculator(alternativePensionScheme){
        // select tier
        if((this.grossCalculator() <= this.pensionablePayTiers.tier1.max)){
            this.pensionablePay.tier1 = this.grossCalculator() * 0.06; // 6% of gross
        };
        if((this.grossCalculator() > this.pensionablePayTiers.tier1.max)){
            this.pensionablePay.tier1 = 480; // 6% of gross
        };
        if((this.grossCalculator() >= this.pensionablePayTiers.tier2.min) && (this.grossCalculator() <= this.pensionablePayTiers.tier2.max) && !alternativePensionScheme){
            this.pensionablePay.tier2 = (this.grossCalculator() - this.pensionablePayTiers.tier2.min) * 0.06; // 6% of gross
        };
        if((this.grossCalculator() > this.pensionablePayTiers.tier2.max) && !alternativePensionScheme){
            this.pensionablePay.tier2 = 3840; // 6% of gross
        };
        return parseFloat(parseInt(this.pensionablePay.tier2) + parseInt(this.pensionablePay.tier1)).toFixed(2)
    };
    SHIFCalculator(){
        return parseFloat((this.grossCalculator() * 2.75)/100).toFixed(2);
    };
    taxablePayCalculator(){
        const taxableIncome =  this.grossCalculator() - this.benefits;
        let taxablePay=0;
        
        taxablePay += PayELowBand(taxableIncome,this.rateTax)
        taxablePay += PayMidEBand(taxableIncome,this.rateTax)
        taxablePay += PayMidHighEBand(taxableIncome,this.rateTax)
        taxablePay += PayHighEBand(taxableIncome,this.rateTax)
        taxablePay += PayHighestEBand(taxableIncome,this.rateTax)

        return parseFloat(taxablePay).toFixed(2)
    };
    /*Tax*/
    payeeTaxCalculator(){
        // paye = taxable income + reliefs
        const disabilityRelief = this.disabilityExemption ? this.relief.disabilityExemption : 0;
        const insuranceRelief = this.insuranceRelief > 0 ? this.insuranceRelief : 0;
        return parseFloat(
            parseInt(this.taxablePayCalculator()) - 
            (
                parseInt(this.relief.personalRelief) + 
                parseInt(disabilityRelief) + 
                parseInt(insuranceRelief) 
            )
        ).toFixed(2)
    };
    netSalaryCalculator(){
        // net = gross - totalDeductions
        return parseFloat(
            parseInt(this.grossCalculator()) - 
            (
                parseInt(this.payeeTaxCalculator()) + 
                parseInt(this.SHIFCalculator()) + 
                parseInt(this.NSSFCalculator())+
                4500
            )
        ).toFixed(2)
    };
    displayBreakdown() {
        
        console.log("\n--- SALARY BREAKDOWN ---");
        console.log(`Gross Salary: KES ${this.grossCalculator()}`);
        console.log(`NSSF Deduction: KES ${this.NSSFCalculator()}`);
        console.log(`SHIF Deduction: KES ${this.SHIFCalculator()}`);
        console.log(`HOUSING LEVY Deduction: KES 4500`);
        console.log(`TAXABLE INCOME: KES ${this.taxablePayCalculator()}`);
        console.log(`PAYE (Tax): KES ${this.payeeTaxCalculator()}`);
        console.log(`Net Salary: KES ${this.netSalaryCalculator()}`);
        console.log("------------------------\n");
    }
};

while(true){
    console.clear();
    console.log('+---------------------------+NET SALARY CALCULATOR!!+---------------------------+');

    const baseSalary = baseSalaryPrompter();
    const benefits = benefitsPrompter();
    const allowances = allowancesPrompter();
    const alternativePensionScheme = alternativePensionSchemePrompter();
    const disabilityExemption = disabilityExemptionPrompter();
    const insuranceRelief = insuranceReliefPrompter();

    const salary = new salaryCalculator(
        baseSalary,
        benefits,
        allowances,
        alternativePensionScheme,
        disabilityExemption,
        insuranceRelief
    );
    salary.displayBreakdown();
    prompt("\nPress Enter to continue...");

};

function baseSalaryPrompter(){
    const baseSalary = prompt('What is your base salary  :').trim();
    if(!baseSalary){
        console.log('\n You did not enter anything: ')
        baseSalaryPrompter()
    };
    if(isNaN(baseSalary)){
        console.log('\n Your choice should be a number: ')
        baseSalaryPrompter()
    }
    return baseSalary;
}
function benefitsPrompter(){
    const benefits = prompt('What are your benefits').trim();
    if(!benefits){
        console.log('\n You did not enter anything: ')
        benefitsPrompter()
    };
    if(isNaN(benefits)){
        console.log('\n Your input should be a number: ')
        benefitsPrompter()
    }
    return benefits > 0? benefits : 1080;
}
function allowancesPrompter(){
    const allowances = prompt('What are your allowances  :').trim();
    if(!allowances){
        console.log('\n You did not enter anything: ')
        allowancesPrompter()
    };
    if(isNaN(allowances)){
        console.log('\n Your input should be a number: ')
        allowancesPrompter()
    }
    return allowances;
}
function insuranceReliefPrompter(){
    const insuranceRelief = prompt('What is your insurance Relief  :').trim();
    if(!insuranceRelief){
        console.log('\n You did not enter anything: ')
        insuranceReliefPrompter()
    };
    if(isNaN(insuranceRelief)){
        console.log('\n Your input should be a number: ')
        insuranceReliefPrompter()
    }
    return insuranceRelief;
}
function alternativePensionSchemePrompter(){
    const alternativePensionScheme = prompt('Do you have a diffenrent pension scheme? Type "Y" for yes or "N" for no  :').trim();
    if(!alternativePensionScheme){
        console.log('\n You did not enter anything: ')
        alternativePensionSchemePrompter()
    };
    if(alternativePensionScheme.toLowerCase().includes['y','n']){
        console.log('\n Your input should be y or n: ')
        alternativePensionSchemePrompter()
    }
    return alternativePensionScheme;
}
function disabilityExemptionPrompter(){
    const disabilityExemption = prompt('Do you have a disability excemption certificate? Type "Y" for yes or "N" for no  :').trim();
    if(!disabilityExemption){
        console.log('\n You did not enter anything: ')
        disabilityExemptionPrompter()
    };
    if(disabilityExemption.toLowerCase().includes['y','n']){
        console.log('\n Your input should be y or n: ')
        disabilityExemptionPrompter()
    }
    if(disabilityExemption === 'y'){
        return true;
    }else{
        return false;
    }
}
function PayELowBand(taxableIncome,rateTax){
    if(taxableIncome <=rateTax["10"]["max"]) {
        return (taxableIncome * rateTax["10"]["mux"])/100
    }else if(taxableIncome >= rateTax["10"]["max"]){
        return (rateTax["10"]["max"] * rateTax["10"]["mux"])/100
    }else{
        return 0
    }
}
function PayMidEBand(taxableIncome,rateTax){
    if(taxableIncome >= rateTax["25"]["min"] && taxableIncome <= rateTax["25"]["max"]) {
        return (taxableIncome - rateTax["25"]["min"] ) * rateTax["25"]["mux"]/100
    }else if(taxableIncome >= rateTax["25"]["max"]){
        return ((rateTax["25"]["max"] -rateTax["25"]["min"]) * rateTax["25"]["mux"]/100)
    }else{
        return 0
    }
}
function PayMidHighEBand(taxableIncome,rateTax){
    if(taxableIncome >= rateTax["30"]["min"] && taxableIncome <= rateTax["30"]["max"]) {
        return (taxableIncome - rateTax["30"]["min"] ) *rateTax["30"]["mux"]/100
    }else if(taxableIncome >= rateTax["30"]["max"]){
        return ((rateTax["30"]["max"] -rateTax["30"]["min"]) *rateTax["30"]["mux"]/100)
    }else{
        return 0
    }
}
function PayHighEBand(taxableIncome,rateTax){
    if(taxableIncome >=rateTax["32.5"]["min"] && taxableIncome <=rateTax["32.5"]["max"]) {
        return (taxableIncome - rateTax["32.5"]["min"]) *rateTax["32.5"]["mux"]/100
    }else if(taxableIncome >=rateTax["32.5"]["max"]){
        return ((rateTax["32.5"]["max"] -rateTax["32.5"]["min"]) *rateTax["32.5"]["mux"]/100)
    }else{
        return 0
    }
}
function PayHighestEBand(taxableIncome,rateTax){
    if(taxableIncome >=rateTax["35"]["min"]) {
        return ((taxableIncome -rateTax["35"]["min"])*rateTax["35"]["mux"]/100)
    }else{
        return 0
    }
}
