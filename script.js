document.addEventListener('DOMContentLoaded', function() {
    const salaryContainer = document.getElementById('salary-container');
    const costContainer = document.getElementById('cost-container');
    const saveSalaryBtn = document.getElementById('save-salary');
    const calculateBtn = document.getElementById('calculate');
    const changeSalaryBtn = document.getElementById('change-salary');
    const resultDiv = document.getElementById('result');
    
    // Verificar si ya hay un salario guardado
    const savedSalary = localStorage.getItem('salary');
    const savedPeriod = localStorage.getItem('period');
    
    if (savedSalary && savedPeriod) {
        salaryContainer.style.display = 'none';
        costContainer.style.display = 'block';
    }
    
    // Guardar salario
    saveSalaryBtn.addEventListener('click', function() {
        const salaryAmount = parseFloat(document.getElementById('salary-amount').value);
        const period = document.querySelector('input[name="period"]:checked').value;
        
        if (isNaN(salaryAmount) || salaryAmount <= 0) {
            alert('Por favor ingresa un valor válido para tu salario');
            return;
        }
        
        localStorage.setItem('salary', salaryAmount);
        localStorage.setItem('period', period);
        
        salaryContainer.style.display = 'none';
        costContainer.style.display = 'block';
    });
    
    // Calcular tiempo de trabajo
    calculateBtn.addEventListener('click', function() {
        const itemCost = parseFloat(document.getElementById('item-cost').value);
        
        if (isNaN(itemCost) || itemCost <= 0) {
            alert('Por favor ingresa un costo válido');
            return;
        }
        
        const salary = parseFloat(localStorage.getItem('salary'));
        const period = localStorage.getItem('period');
        
        let hourlyRate;
        const hoursPerMonth = 160; // Suponiendo 40 horas/semana * 4 semanas
        
        if (period === 'monthly') {
            hourlyRate = salary / hoursPerMonth;
        } else { // anual
            hourlyRate = salary / (hoursPerMonth * 12);
        }
        
        const workHours = itemCost / hourlyRate;
        
        let message;
        
        if (workHours < 1) {
            const minutes = Math.round(workHours * 60);
            message = `Te costaría aproximadamente ${minutes} minuto${minutes !== 1 ? 's' : ''} de trabajo.`;
        } else if (workHours < 8) {
            const hours = Math.round(workHours * 10) / 10;
            message = `Te costaría aproximadamente ${hours} hora${hours !== 1 ? 's' : ''} de trabajo.`;
        } else if (workHours < 40) {
            const days = Math.round(workHours / 8 * 10) / 10;
            message = `Te costaría aproximadamente ${days} día${days !== 1 ? 's' : ''} de trabajo.`;
        } else {
            const weeks = Math.round(workHours / 40 * 10) / 10;
            message = `Te costaría aproximadamente ${weeks} semana${weeks !== 1 ? 's' : ''} de trabajo.`;
        }
        
        resultDiv.textContent = message;
        resultDiv.style.display = 'block';
    });
    
    // Cambiar salario
    changeSalaryBtn.addEventListener('click', function() {
        costContainer.style.display = 'none';
        salaryContainer.style.display = 'block';
    });
});
