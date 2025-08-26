const ultimaAtualizacao = "26/08/2025"; // SEMPRE ATUALIZAR
const dadosEmpresas = [
    {
        nome: "CASTELÃO LOCAÇÕES",
        depositos: [
            { data: "15-07-2025", valor: 1000 },
            { data: "02-08-2025", valor: 500 },
            { data: "07-08-2025", valor: 500 },
            { data: "21-08-2025", valor: 1000 },
            
        ],
        gastos: [
            { data: "25-07-2025", valor: 670.81, descricao: "Campanhas" },
            { data: "28-07-2025", valor: 100.00, descricao: "Campanhas" },
            { data: "30-07-2025", valor: 100.00, descricao: "Campanhas" },
            { data: "31-07-2025", valor: 80.00, descricao: "Final de semana" },
            { data: "02-08-2025", valor: 30.00, descricao: "Final de semana" },
            { data: "04-08-2025", valor: 100.00, descricao: "Campanhas Ads" },
            { data: "04-08-2025", valor: 130.00, descricao: "Dia dos Pais" },
            { data: "07-08-2025", valor: 140.00, descricao: "Betoneira Diaria" },
            { data: "08-08-2025", valor: 55.00, descricao: "Vaga Emprego" },
            { data: "11-08-2025", valor: 100.00, descricao: "Carrinho de mão" },
            { data: "12-08-2025", valor: 90.00, descricao: "Ofertas vedacit" },
            { data: "13-08-2025", valor: 70.00, descricao: "Betoneira Mes" },
            { data: "13-08-2025", valor: 70.00, descricao: "Vaga Emprego" },
            { data: "14-08-2025", valor: 95.00, descricao: "Aluguel FDS" },
            { data: "19-08-2025", valor: 100.00, descricao: "Aluguel Betoneira" },
            { data: "20-08-2025", valor: 50.00, descricao: "Encarte Completo" },
            { data: "22-08-2025", valor: 60.00, descricao: "Campanha Compactador"},
            { data: "22-08-2025", valor: 60.00, descricao: "Campanha Andaime" },

        ]
    },
    {
        nome: "SUPERMERCADO CASTELÃO",
        depositos: [
            { data: "07-07-2025", valor: 1000 },
            { data: "25-07-2025", valor: 1250 },
            { data: "19-08-2025", valor: 1200 },
        ],
        gastos: [
            { data: "25-07-2025", valor: 933.65, descricao: "Campanhas Ads" },
            { data: "28-07-2025", valor: 120.00, descricao: "Campanhas Padaria" },
            { data: "30-07-2025", valor: 90.00, descricao: "Campanhas Pais" },
            { data: "02-08-2025", valor: 140.00, descricao: "Sorteio pais" },
            { data: "05-08-2025", valor: 110.00, descricao: "Campanhas" },
            { data: "06-08-2025", valor: 90.00, descricao: "Sorteio Pais" },
            { data: "07-08-2025", valor: 50.00, descricao: "Esquenta Pais" },
            { data: "07-08-2025", valor: 80.00, descricao: "Padaria" },
            { data: "08-08-2025", valor: 65.00, descricao: "Dia dos Pais" },
            { data: "08-08-2025", valor: 65.00, descricao: "Dia dos Pais Horti F" },
            { data: "12-08-2025", valor: 95.00, descricao: "Atacado" },
            { data: "13-08-2025", valor: 90.00, descricao: "Quarta da Carne" },
            { data: "15-08-2025", valor: 60.00, descricao: "Oferta Cerv." },
            { data: "19-08-2025", valor: 90.00, descricao: "Oferta Sema." },
            { data: "19-08-2025", valor: 80.00, descricao: "Agua de coco" },
            { data: "20-08-2025", valor: 40.00, descricao: "Quarta do Açougue" },
            { data: "21-08-2025", valor: 70.00, descricao: "Dia de feira" },
            { data: "26-08-2025", valor: 60.00, descricao: "Horti" },
            { data: "26-08-2025", valor: 70.00, descricao: "Terça e Quarta da carne" },
        ]
    },
    {
        nome: "NORTÃO QUITANDA",
        depositos: [
            { data: "07-07-2025", valor: 1000 },
            { data: "30-07-2025", valor: 1200 }

        ],
        gastos: [
            { data: "25-07-2025", valor: 578.07, descricao: "Campanhas Ads" },
            { data: "28-07-2025", valor: 140.00, descricao: "Campanhas Ads" },
            { data: "30-07-2025", valor: 156.00, descricao: "Campanhas Ads" },
            { data: "31-07-2025", valor: 98.30, descricao: "Quinta verde" },
            { data: "31-07-2025", valor: 60.00, descricao: "Banana nanica" },
            { data: "31-07-2025", valor: 80.00, descricao: "Campanhas Ads" },
            { data: "05-08-2025", valor: 100.00, descricao: "Terca verde" },
            { data: "07-08-2025", valor: 50.00, descricao: "Esquenta Pais" },
            { data: "08-08-2025", valor: 65.00, descricao: "Dia dos Pais" },
            { data: "12-08-2025", valor: 95.00, descricao: "Atacado" },
            { data: "19-08-2025", valor: 100.00, descricao: "Oferta semana" },
            { data: "19-08-2025", valor: 80.00, descricao: "Agua de coco" },
            { data: "19-08-2025", valor: 50.00, descricao: "video Quitanda" },
            { data: "21-08-2025", valor: 1.12, descricao: "Pastor" },
            { data: "21-08-2025", valor: 70.00, descricao: "Dia de Feira" },
            { data: "26-08-2025", valor: 60.00, descricao: "Horti" },
        ]
    },
    {
        nome: "VARANDA ESPETARIA",
        depositos: [
            { data: "15-07-2025", valor: 1000 },
            { data: "30-07-2025", valor: 1000 }
        ],
        gastos: [
            { data: "25-07-2025", valor: 560.91, descricao: "Campanhas Ads" },
            { data: "28-07-2025", valor: 115.00, descricao: "Campanhas Ads" },
            { data: "30-07-2025", valor: 95.00, descricao: "Campanhas Ads" },
            { data: "31-07-2025", valor: 80.00, descricao: "Campanhas Ads" },
            { data: "02-08-2025", valor: 90.00, descricao: "Frango Assado" },
            { data: "02-08-2025", valor: 225.00, descricao: "Sorteio dos Pais" },
            { data: "07-08-2025", valor: 80.00, descricao: "Oferta carnes" },
            { data: "08-08-2025", valor: 90.00, descricao: "Costela Sabado" },
            { data: "14-08-2025", valor: 100.00, descricao: "Reserva corte" },
            { data: "15-08-2025", valor: 75.00, descricao: "Reserva frango" },
            { data: "19-08-2025", valor: 50.00, descricao: "Horario atend" },
            { data: "20-08-2025", valor: 70.00, descricao: "Marm. Churras" },
            
        ]
    }
];
