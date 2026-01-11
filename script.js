const schools = {
    "McGill": { base: 0.60, actCutoff: 27, mathSensitive: false },
    "UBC": { base: 0.45, actCutoff: 27, mathSensitive: true },
    "Cooper Union": { base: 0.18, actCutoff: 30, mathSensitive: true },
    "University of Toronto": { base: 0.33, actCutoff: 27, mathSensitive: false },
    "Northeastern": { base: 0.50, actCutoff: 30, mathSensitive: false },
    "University of Washington": { base: 0.50, actCutoff: null, mathSensitive: false },
    "UCL (IFY)": { base: 0.62, actCutoff: 26, mathSensitive: false }
};

function simulate(student, school) {
    let chance = school.base;

    if (school.actCutoff && student.act < school.actCutoff) {
        return "Rejected (Below Cutoff)";
    }

    if (student.gpa >= 3.9) chance += 0.05;

    if (school.mathSensitive) {
        if (student.math >= 32) chance += 0.15;
        else if (student.math >= 30) chance += 0.10;
        else chance -= 0.05;
    }

    if (student.research === "high") chance += 0.07;
    if (student.research === "medium") chance += 0.03;

    if (student.essay === "exceptional") chance += 0.07;
    if (student.essay === "strong") chance += 0.03;

    if (student.french && school === schools["McGill"]) chance += 0.05;

    chance += (Math.random() - 0.5) * 0.1;
    chance = Math.min(Math.max(chance, 0.01), 0.95);

    let roll = Math.random();
    if (roll < chance) return "Admitted";
    if (roll < chance + 0.10) return "Waitlisted";
    return "Rejected";
}

function runSimulation() {
    const student = {
        gpa: parseFloat(document.getElementById("gpa").value),
        act: parseInt(document.getElementById("act").value),
        math: parseInt(document.getElementById("math").value),
        research: document.getElementById("research").value,
        essay: document.getElementById("essay").value,
        french: document.getElementById("french").checked
    };

    let output = "<h2>Results</h2>";

    for (let school in schools) {
        let result = simulate(student, schools[school]);
        output += `<div class="result"><strong>${school}:</strong> ${result}</div>`;
    }

    document.getElementById("results").innerHTML = output;
}
