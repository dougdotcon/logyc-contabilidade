// Calculadora de Mensalidade - LOGYC CONTABILIDADE

document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-btn');
    const companyTypeSelect = document.getElementById('company-type');
    const monthlyRevenueInput = document.getElementById('monthly-revenue');
    const employeesInput = document.getElementById('employees');
    const resultDiv = document.getElementById('calculator-result');

    // Dados de preços conforme especificação
    const pricingData = {
        mei: {
            regime: 'SIMEI / MEI',
            limit: 81000,
            basePrice: 75,
            employeePrice: 40,
            includedEmployees: 0,
            example: 'cliente de serviços de transporte fatura R$ 19.500/mês sem funcionários'
        },
        servicos: {
            regime: 'Simples Nacional',
            tiers: [
                { limit: 20000, price: 285 },
                { limit: Infinity, price: 370 }
            ],
            employeePrice: 25,
            includedEmployees: 3,
            example: 'faturamento de R$ 58.900/mês com 2 funcionários → mensalidade de R$ 390,00'
        },
        comercio: {
            regime: 'Simples Nacional',
            tiers: [
                { limit: 25000, price: 245 },
                { limit: Infinity, price: 390 }
            ],
            employeePrice: 25,
            includedEmployees: 3
        },
        industria: {
            regime: 'Simples Nacional',
            tiers: [
                { limit: 35000, price: 300 },
                { limit: Infinity, price: 545 }
            ],
            employeePrice: 25,
            includedEmployees: 3
        },
        profissionais: {
            regime: 'Simples Nacional',
            tiers: [
                { limit: 15000, price: 199 },
                { limit: Infinity, price: 234 }
            ],
            employeePrice: 25,
            includedEmployees: 3
        }
    };

    calculateBtn.addEventListener('click', function() {
        const companyType = companyTypeSelect.value;
        const monthlyRevenue = parseFloat(monthlyRevenueInput.value) || 0;
        const employees = parseInt(employeesInput.value) || 0;

        if (!companyType) {
            alert('Por favor, selecione o tipo de empresa.');
            return;
        }

        if (monthlyRevenue <= 0) {
            alert('Por favor, informe um faturamento mensal válido.');
            return;
        }

        const result = calculatePrice(companyType, monthlyRevenue, employees);
        displayResult(result);
    });

    function calculatePrice(companyType, monthlyRevenue, employees) {
        const data = pricingData[companyType];
        let basePrice = 0;
        let limit = '';
        let employeeCost = 0;

        if (companyType === 'mei') {
            basePrice = data.basePrice;
            limit = `R$ ${data.limit.toLocaleString('pt-BR')}`;
            employeeCost = employees * data.employeePrice;
        } else {
            // Para outros tipos, encontrar o tier correto
            for (let tier of data.tiers) {
                if (monthlyRevenue <= tier.limit) {
                    basePrice = tier.price;
                    if (tier.limit === Infinity) {
                        limit = `Acima de R$ ${data.tiers[data.tiers.length - 2].limit.toLocaleString('pt-BR')}`;
                    } else {
                        limit = `Até R$ ${tier.limit.toLocaleString('pt-BR')}`;
                    }
                    break;
                }
            }

            // Calcular custo adicional de funcionários
            if (employees > data.includedEmployees) {
                employeeCost = (employees - data.includedEmployees) * data.employeePrice;
            }
        }

        const totalPrice = basePrice + employeeCost;

        return {
            regime: data.regime,
            limit: limit,
            basePrice: basePrice,
            employees: employees,
            employeeCost: employeeCost,
            totalPrice: totalPrice,
            includedEmployees: data.includedEmployees || 0,
            example: data.example || ''
        };
    }

    function displayResult(result) {
        document.getElementById('regime-result').textContent = result.regime;
        document.getElementById('limit-result').textContent = result.limit;
        document.getElementById('base-result').textContent = `R$ ${result.basePrice.toFixed(2).replace('.', ',')}`;
        
        let employeesText = `${result.employees} funcionário(s)`;
        if (result.includedEmployees > 0) {
            employeesText += ` (até ${result.includedEmployees} inclusos)`;
        }
        if (result.employeeCost > 0) {
            employeesText += ` +R$ ${result.employeeCost.toFixed(2).replace('.', ',')}`;
        }
        document.getElementById('employees-result').textContent = employeesText;
        
        document.getElementById('total-result').textContent = `R$ ${result.totalPrice.toFixed(2).replace('.', ',')}`;
        
        const exampleDiv = document.getElementById('result-example');
        if (result.example) {
            exampleDiv.innerHTML = `<strong>Exemplo:</strong> ${result.example}`;
            exampleDiv.style.display = 'block';
        } else {
            exampleDiv.style.display = 'none';
        }

        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }

    // Formatação de moeda no input
    monthlyRevenueInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value) {
            value = (parseInt(value) / 100).toFixed(2);
            e.target.value = value;
        }
    });

    // Formatação de moeda no placeholder
    monthlyRevenueInput.addEventListener('focus', function(e) {
        if (e.target.value === '0.00') {
            e.target.value = '';
        }
    });

    monthlyRevenueInput.addEventListener('blur', function(e) {
        if (e.target.value === '') {
            e.target.value = '0.00';
        }
    });
});
