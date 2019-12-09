const router = require('express').Router()


// This route will take in data from the form sumitted by the user 
// convert the values and send it back to the front end to re-render graph 
// and other dynamic elements 
router.post('/', (req, res) => {
    let question1 = req.body.question1; // qty example : 5 
    let question2 = req.body.question2;
    let question3 = req.body.question3;
    let question4 = req.body.question4;
    let question5 = req.body.question5;

    let currentAnnualCost = question5 * 12;
    let dailyHours = 7;
    let utilityRatePerkWh = .11;

    //Calculations based on the quantity of the led lighting 
    let totalKwhSavedFor40WattBulbLed = dailyHours * 365 * 36 / 1000 * question1; // 63 kWh saved
    let totalKwhSavedFor60WattBulbLed = dailyHours * 365 * 50.5 / 1000 * question2; // 92 kWh saved
    let totalKwhSavedFor15WattBulbLed = dailyHours * 365 * 12 / 1000 * question3;// 21 kWh saved
    let totalKwhSavedFor32WattBulbLed = dailyHours * 365 * 16 / 1000 * question4;// 29 kWh saved
    let totalKwhSavedForAllOptions = totalKwhSavedFor60WattBulbLed + totalKwhSavedFor40WattBulbLed + totalKwhSavedFor15WattBulbLed + totalKwhSavedFor32WattBulbLed;
    let kwhSavingsConvertedTo$PerYearForLed = utilityRatePerkWh * totalKwhSavedForAllOptions;
    let newCostLed = currentAnnualCost - kwhSavingsConvertedTo$PerYearForLed;
    let savingsConvertedToPercentage = Math.ceil((currentAnnualCost - newCostLed) / currentAnnualCost * 100);

    //Calculations based on the quantity of the older lighting 
    let totalKwhSavedFor40WattBulb = dailyHours * 365 * 40 / 1000 * question1;
    let totalKwhSavedFor60WattBulb = dailyHours * 365 * 60 / 1000 * question2;
    let totalKwhSavedFor15WattBulb = dailyHours * 365 * 15 / 1000 * question3;
    let totalKwhSavedFor32WattBulb = dailyHours * 365 * 32 / 1000 * question4;
    let totalKwhSavedForAllLedOptions = totalKwhSavedFor60WattBulb + totalKwhSavedFor40WattBulb + totalKwhSavedFor15WattBulb + totalKwhSavedFor32WattBulb;
    let kwhSavingsConvertedTo$PerYearForLedForOlderLighting = utilityRatePerkWh * totalKwhSavedForAllLedOptions;
    let costForOldLighting = kwhSavingsConvertedTo$PerYearForLedForOlderLighting;


    let x = parseInt(question5);
    let y = newCostLed / 12;


    let fiveYearSavings = kwhSavingsConvertedTo$PerYearForLed * 5;
    let tenYearSavings = kwhSavingsConvertedTo$PerYearForLed * 10;
    let twentyYearSavings = kwhSavingsConvertedTo$PerYearForLed * 20;


    let threeYearSavings = kwhSavingsConvertedTo$PerYearForLed * 3;
    let sixYearSavings = kwhSavingsConvertedTo$PerYearForLed * 6;
    let nineYearSavings = kwhSavingsConvertedTo$PerYearForLed * 9;
    let twelveYearSavings = kwhSavingsConvertedTo$PerYearForLed * 12;
    let fifteenYearSavings = kwhSavingsConvertedTo$PerYearForLed * 15;
    let eighteenYearSavings = kwhSavingsConvertedTo$PerYearForLed * 18;
    let twentyOneYearSavings = kwhSavingsConvertedTo$PerYearForLed * 21;


    let yearlySavings = [kwhSavingsConvertedTo$PerYearForLed, threeYearSavings, sixYearSavings, nineYearSavings, twelveYearSavings, fifteenYearSavings, eighteenYearSavings, twentyOneYearSavings]

    let new60watt = 2.50;
    let new40watt = 2.50;
    let new15watt = 1.88;
    let new32watt = 9.99;

    let old60watt = 1.00;
    let old40watt = 1.00;
    let old15watt = 1.50;
    let old32watt = 4.50;

    let totalInvestmentForOld = (old60watt * question1) + (old40watt * question2) + (old15watt * question3) + (old32watt * question4);

    let totalInvestmentForLed = (new60watt * question1) + (new40watt * question2) + (new15watt * question3) + (new32watt * question4);
    let roi = (kwhSavingsConvertedTo$PerYearForLed / 365);
    let roiIndays = Math.ceil(totalInvestmentForLed / roi);
    let roiInMonths = Math.ceil(roiIndays / 30);

    let oldLightingCost = [x, x, x, x, x, x, x, x];
    let newLightingCost = [y, y, y, y, y, y, y, y, y, y, y, y];

    let dataContainer = {
        oldlighting: oldLightingCost,
        newlighting: newLightingCost,
        annualcost: currentAnnualCost,
        costafterupgrading: newCostLed,
        percentagesavings: savingsConvertedToPercentage,
        oneyearsavings: kwhSavingsConvertedTo$PerYearForLed,
        fiveyearsavings: fiveYearSavings,
        tenyearsavings: tenYearSavings,
        twentyyearsavings: twentyYearSavings,
        kWhOneYear: totalKwhSavedForAllOptions,
        totalInvestmentForLed: totalInvestmentForLed.toFixed(2),
        roiInMonths: roiInMonths,
        roiIndays: roiIndays,
        totalcosttoreplaceoldlighting: totalInvestmentForOld,
        utilitycostforoldlighting: costForOldLighting,
        yearlysavings: yearlySavings

    }

    res.send(JSON.stringify(dataContainer))
})




//testing
router.get('/', (req, res) => {
    res.end('Hello')

})






module.exports = router