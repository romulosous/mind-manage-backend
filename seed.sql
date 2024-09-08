INSERT INTO
    "Patient" (
        "name",
        "email",
        "password",
        "registration",
        "course",
        "education",
        "age",
        "phone",
        "gender",
        "patientType",
        "attachment",
        "series",
        "createdAt",
        "updatedAt",
        "createdBy",
        "isActive",
        "difficulty"
    )
VALUES (
        'João Silva',
        'joao.silva@example.com',
        'senhaSegura123',
        '20211001',
        'ADS',
        'SUPERIOR',
        22,
        '+55 11 91234-5678',
        'MALE',
        'STUDENT',
        '{PEDAGOGICAL_REPORT}',
        '1A',
        '2023-09-01T08:00:00',
        NULL,
        'PSYCHOLOGIST',
        TRUE,
        '{AVALIATION, CONCENTRATION}'
    ),
    (
        'Maria Oliveira',
        'maria.oliveira@example.com',
        'senhaSegura123',
        '20211002',
        'FISICA',
        'SUPERIOR',
        23,
        '+55 11 91234-5679',
        'FEMALE',
        'STUDENT',
        '{MEDICAL_REPORT}',
        '2B',
        '2023-09-02T08:00:00',
        NULL,
        'PSYCHOLOGIST',
        TRUE,
        '{MEMORY, ORGANIZATION_ON_STUDIES}'
    ),
    (
        'Pedro Almeida',
        'pedro.almeida@example.com',
        'senhaSegura123',
        '20211003',
        'QUIMICA',
        'MEDIO',
        20,
        '+55 11 91234-5680',
        'MALE',
        'STUDENT',
        '{TEACHER_REPORT}',
        '3C',
        '2023-09-03T08:00:00',
        NULL,
        'PSYCHOLOGIST',
        TRUE,
        '{CONCENTRATION, TDAH}'
    ),
    (
        'Ana Costa',
        'ana.costa@example.com',
        'senhaSegura123',
        '20211004',
        'ADMINISTRACAO',
        'POS_GRADUACAO',
        28,
        '+55 11 91234-5681',
        'FEMALE',
        'CONTRACTOR',
        '{PROFESSIONAL_REPORT}',
        '4D',
        '2023-09-04T08:00:00',
        NULL,
        'PSYCHOLOGIST',
        TRUE,
        '{RELATIONSHIP, COMUNICATION}'
    ),
    (
        'Lucas Sousa',
        'lucas.sousa@example.com',
        'senhaSegura123',
        '20211005',
        'ELETROTECNICA',
        'MESTRADO',
        30,
        '+55 11 91234-5682',
        'MALE',
        'TEACHER',
        '{CORDENATION_REPORT}',
        '5E',
        '2023-09-05T08:00:00',
        NULL,
        'PSYCHOLOGIST',
        TRUE,
        '{ORGANIZATION_ON_STUDIES, AVALIATION}'
    ),
    (
        'Bruna Pereira',
        'bruna.pereira@example.com',
        'senhaSegura123',
        '20211006',
        'ADS',
        'SUPERIOR',
        25,
        '+55 11 91234-5683',
        'FEMALE',
        'STUDENT',
        '{DIRECTION_REPORT}',
        '6F',
        '2023-09-06T08:00:00',
        NULL,
        'PSYCHOLOGIST',
        TRUE,
        '{MEMORY, AVALIATION}'
    ),
    (
        'Carlos Lima',
        'carlos.lima@example.com',
        'senhaSegura123',
        '20211007',
        'INFORMATICA',
        'SUPERIOR',
        27,
        '+55 11 91234-5684',
        'MALE',
        'CONTRACTOR',
        '{ENAPI_REPORT}',
        '7G',
        '2023-09-07T08:00:00',
        NULL,
        'PSYCHOLOGIST',
        TRUE,
        '{TDAH, CONCENTRATION}'
    ),
    (
        'Fernanda Ferreira',
        'fernanda.ferreira@example.com',
        'senhaSegura123',
        '20211008',
        'QUIMICA',
        'SUPERIOR',
        24,
        '+55 11 91234-5685',
        'FEMALE',
        'STUDENT',
        '{SPONTANEOUS_DECISION}',
        '8H',
        '2023-09-08T08:00:00',
        NULL,
        'PSYCHOLOGIST',
        TRUE,
        '{CONCENTRATION, ORGANIZATION_ON_STUDIES}'
    ),
    (
        'Rafael Barbosa',
        'rafael.barbosa@example.com',
        'senhaSegura123',
        '20211009',
        'ADMINISTRACAO',
        'SUPERIOR',
        29,
        '+55 11 91234-5686',
        'MALE',
        'STUDENT',
        '{DIRECTION_EDUCATION_REPORT}',
        '9I',
        '2023-09-09T08:00:00',
        NULL,
        'PSYCHOLOGIST',
        TRUE,
        '{AVALIATION, RELATIONSHIP}'
    ),
    (
        'Camila Gomes',
        'camila.gomes@example.com',
        'senhaSegura123',
        '20211010',
        'ELETROTECNICA',
        'SUPERIOR',
        26,
        '+55 11 91234-5687',
        'FEMALE',
        'STUDENT',
        '{OTHER}',
        '10J',
        '2023-09-10T08:00:00',
        NULL,
        'PSYCHOLOGIST',
        TRUE,
        '{COMUNICATION, AVALIATION}'
    ),
    (
        'Felipe Rocha',
        'felipe.rocha@example.com',
        'senhaSegura123',
        '20211011',
        'ADS',
        'POS_GRADUACAO',
        32,
        '+55 11 91234-5688',
        'MALE',
        'TEACHER',
        '{MEDICAL_REPORT}',
        '11K',
        '2023-09-11T08:00:00',
        NULL,
        'PSYCHOLOGIST',
        TRUE,
        '{MEMORY, ORGANIZATION_ON_STUDIES}'
    ),
    (
        'Gabriela Martins',
        'gabriela.martins@example.com',
        'senhaSegura123',
        '20211012',
        'QUIMICA',
        'SUPERIOR',
        24,
        '+55 11 91234-5689',
        'FEMALE',
        'CONTRACTOR',
        '{TEACHER_REPORT}',
        '12L',
        '2023-09-12T08:00:00',
        NULL,
        'PSYCHOLOGIST',
        TRUE,
        '{CONCENTRATION, RELATIONSHIP}'
    ),
    (
        'Marcos Teixeira',
        'marcos.teixeira@example.com',
        'senhaSegura123',
        '20211013',
        'ADMINISTRACAO',
        'MESTRADO',
        33,
        '+55 11 91234-5690',
        'MALE',
        'GUARDIAN',
        '{PROFESSIONAL_REPORT}',
        '13M',
        '2023-09-13T08:00:00',
        NULL,
        'PSYCHOLOGIST',
        TRUE,
        '{TDAH, ORGANIZATION_ON_STUDIES}'
    ),
    (
        'Juliana Ribeiro',
        'juliana.ribeiro@example.com',
        'senhaSegura123',
        '20211014',
        'INFORMATICA',
        'SUPERIOR',
        22,
        '+55 11 91234-5691',
        'FEMALE',
        'STUDENT',
        '{CORDENATION_REPORT}',
        '14N',
        '2023-09-14T08:00:00',
        NULL,
        'PSYCHOLOGIST',
        TRUE,
        '{CONCENTRATION, AVALIATION}'
    ),
    (
        'Gustavo Nogueira',
        'gustavo.nogueira@example.com',
        'senhaSegura123',
        '20211015',
        'ADS',
        'SUPERIOR',
        24,
        '+55 11 91234-5692',
        'MALE',
        'STUDENT',
        '{ENAPI_REPORT}',
        '15O',
        '2023-09-15T08:00:00',
        NULL,
        'PSYCHOLOGIST',
        TRUE,
        '{MEMORY, RELATIONSHIP}'
    ),
    (
        'Renata Melo',
        'renata.melo@example.com',
        'senhaSegura123',
        '20211016',
        'FISICA',
        'SUPERIOR',
        29,
        '+55 11 91234-5693',
        'FEMALE',
        'TEACHER',
        '{PEDAGOGICAL_REPORT}',
        '16P',
        '2023-09-16T08:00:00',
        NULL,
        'PSYCHOLOGIST',
        TRUE,
        '{ORGANIZATION_ON_STUDIES, AVALIATION}'
    ),
    (
        'Thiago Costa',
        'thiago.costa@example.com',
        'senhaSegura123',
        '20211017',
        'QUIMICA',
        'SUPERIOR',
        27,
        '+55 11 91234-5694',
        'MALE',
        'CONTRACTOR',
        '{SPONTANEOUS_DECISION}',
        '17Q',
        '2023-09-17T08:00:00',
        NULL,
        'PSYCHOLOGIST',
        TRUE,
        '{CONCENTRATION, TDAH}'
    ),
    (
        'Larissa Silva',
        'larissa.silva@example.com',
        'senhaSegura123',
        '20211018',
        'ELETROTECNICA',
        'POS_GRADUACAO',
        25,
        '+55 11 91234-5695',
        'FEMALE',
        'STUDENT',
        '{DIRECTION_REPORT}',
        '18R',
        '2023-09-18T08:00:00',
        NULL,
        'PSYCHOLOGIST',
        TRUE,
        '{AVALIATION, RELATIONSHIP}'
    ),
    (
        'Rodrigo Lopes',
        'rodrigo.lopes@example.com',
        'senhaSegura123',
        '20211019',
        'ADMINISTRACAO',
        'MESTRADO',
        34,
        '+55 11 91234-5696',
        'MALE',
        'TEACHER',
        '{TEACHER_REPORT}',
        '19S',
        '2023-09-19T08:00:00',
        NULL,
        'PSYCHOLOGIST',
        TRUE,
        '{MEMORY, CONCENTRATION}'
    ),
    (
        'Vanessa Pinto',
        'vanessa.pinto@example.com',
        'senhaSegura123',
        '20211020',
        'INFORMATICA',
        'SUPERIOR',
        30,
        '+55 11 91234-5697',
        'FEMALE',
        'CONTRACTOR',
        '{DIRECTION_EDUCATION_REPORT}',
        '20T',
        '2023-09-20T08:00:00',
        NULL,
        'PSYCHOLOGIST',
        TRUE,
        '{COMUNICATION, AVALIATION}'
    ),
    (
        'Eduardo Santos',
        'eduardo.santos@example.com',
        'senhaSegura123',
        '20211021',
        'ELETROTECNICA',
        'MEDIO',
        21,
        '+55 11 91234-5698',
        'MALE',
        'GUARDIAN',
        '{PROFESSIONAL_REPORT}',
        '21U',
        '2023-09-21T08:00:00',
        NULL,
        'PSYCHOLOGIST',
        TRUE,
        '{CONCENTRATION, ORGANIZATION_ON_STUDIES}'
    ),
    (
        'Patricia Araújo',
        'patricia.araujo@example.com',
        'senhaSegura123',
        '20211022',
        'ADS',
        'SUPERIOR',
        27,
        '+55 11 91234-5699',
        'FEMALE',
        'STUDENT',
        '{CORDENATION_REPORT}',
        '22V',
        '2023-09-22T08:00:00',
        NULL,
        'PSYCHOLOGIST',
        TRUE,
        '{MEMORY, RELATIONSHIP}'
    ),
    (
        'Daniel Ramos',
        'daniel.ramos@example.com',
        'senhaSegura123',
        '20211023',
        'FISICA',
        'MESTRADO',
        31,
        '+55 11 91234-5700',
        'MALE',
        'TEACHER',
        '{SPONTANEOUS_DECISION}',
        '23W',
        '2023-09-23T08:00:00',
        NULL,
        'PSYCHOLOGIST',
        TRUE,
        '{TDAH, AVALIATION}'
    ),
    (
        'Mariana Farias',
        'mariana.farias@example.com',
        'senhaSegura123',
        '20211024',
        'QUIMICA',
        'POS_GRADUACAO',
        26,
        '+55 11 91234-5701',
        'FEMALE',
        'CONTRACTOR',
        '{OTHER}',
        '24X',
        '2023-09-24T08:00:00',
        NULL,
        'PSYCHOLOGIST',
        TRUE,
        '{COMUNICATION, RELATIONSHIP}'
    ),
    (
        'José Oliveira',
        'jose.oliveira@example.com',
        'senhaSegura123',
        '20211025',
        'ADMINISTRACAO',
        'SUPERIOR',
        33,
        '+55 11 91234-5702',
        'MALE',
        'GUARDIAN',
        '{MEDICAL_REPORT}',
        '25Y',
        '2023-09-25T08:00:00',
        NULL,
        'PSYCHOLOGIST',
        TRUE,
        '{ORGANIZATION_ON_STUDIES, AVALIATION}'
    );

INSERT INTO
    "Psychologist" (
        "name",
        "email",
        "password",
        "crp",
        "specialty",
        "phone",
        "createdAt",
        "updatedAt"
    )
VALUES (
        'Dr. João Silva',
        'joao.silva@email.com',
        'senha123',
        '123456-CRP',
        'Terapia Cognitiva',
        '11987654321',
        NOW(),
        NULL
    ),
    (
        'Dra. Maria Oliveira',
        'maria.oliveira@email.com',
        'senha123',
        '654321-CRP',
        'Psicologia Infantil',
        '11987654322',
        NOW(),
        NULL
    ),
    (
        'Dr. Pedro Almeida',
        'pedro.almeida@email.com',
        'senha123',
        '987654-CRP',
        'Psicoterapia',
        '11987654323',
        NOW(),
        NULL
    ),
    (
        'Dra. Ana Costa',
        'ana.costa@email.com',
        'senha123',
        '456789-CRP',
        'Psicanálise',
        '11987654324',
        NOW(),
        NULL
    ),
    (
        'Dr. Marcos Souza',
        'marcos.souza@email.com',
        'senha123',
        '789123-CRP',
        'Neuropsicologia',
        '11987654325',
        NOW(),
        NULL
    );

INSERT INTO
    "Appointment" (
        "psychologistId",
        "patientId",
        "appointmentDate",
        "status",
        "reason",
        "name",
        "typeAcctivity",
        "type",
        "observation",
        "obejective",
        "createdAt",
        "updatedAt"
    )
VALUES (
        1,
        1,
        '2024-09-05 10:00:00',
        'PENDING',
        'Consulta de rotina',
        'Consulta Individual',
        'GROUP',
        'SESSION',
        'Paciente precisa de acompanhamento semanal',
        'Melhorar desempenho acadêmico',
        NOW(),
        NOW()
    ),
    (
        1,
        2,
        '2024-09-06 11:00:00',
        'CONFIRMED',
        'Avaliação psicológica',
        'Avaliação inicial',
        'LECTURE',
        'SESSION',
        'Paciente relata estresse no trabalho',
        'Reduzir estresse',
        NOW(),
        NOW()
    ),
    (
        1,
        3,
        '2024-09-07 12:00:00',
        'FINALIZED',
        'Acompanhamento de tratamento',
        'Sessão de acompanhamento',
        'SEMINAR',
        'COLLECTIVE_ACTIVITIES',
        'Paciente apresentou melhoras',
        'Continuar acompanhamento',
        NOW(),
        NOW()
    ),
    (
        1,
        4,
        '2024-09-08 14:00:00',
        'CANCELED',
        'Reunião cancelada pelo paciente',
        'Reunião cancelada',
        'MEETING',
        'ADMINISTRATIVE_RECORDS',
        'Paciente não compareceu',
        'Reagendar sessão',
        NOW(),
        NOW()
    ),
    (
        1,
        5,
        '2024-09-09 15:00:00',
        'ABSENCE',
        'Paciente faltou à sessão',
        'Falta',
        'DISCUSSION_CIRCLE',
        'SESSION',
        'Paciente não justificou ausência',
        'Agendar nova consulta',
        NOW(),
        NOW()
    ),
    -- Agendamentos para a Dra. Maria Oliveira (psychologistId = 2)
    (
        2,
        6,
        '2024-09-10 09:00:00',
        'CONFIRMED',
        'Consulta psicológica infantil',
        'Consulta com criança',
        'GROUP',
        'SESSION',
        'Paciente com dificuldades escolares',
        'Melhorar desempenho escolar',
        NOW(),
        NOW()
    ),
    (
        2,
        7,
        '2024-09-11 10:00:00',
        'FINALIZED',
        'Acompanhamento psicológico infantil',
        'Acompanhamento semanal',
        'LECTURE',
        'SESSION',
        'Paciente apresentou pequenas melhoras',
        'Apoio contínuo',
        NOW(),
        NOW()
    ),
    (
        2,
        8,
        '2024-09-12 11:00:00',
        'PENDING',
        'Sessão de orientação',
        'Consulta com pais',
        'SEMINAR',
        'COLLECTIVE_ACTIVITIES',
        'Discussão sobre comportamentos',
        'Orientação familiar',
        NOW(),
        NOW()
    ),
    (
        2,
        9,
        '2024-09-13 13:00:00',
        'CONFIRMED',
        'Sessão coletiva',
        'Atividade em grupo',
        'MEETING',
        'ADMINISTRATIVE_RECORDS',
        'Pacientes discutem experiências',
        'Troca de experiências',
        NOW(),
        NOW()
    ),
    (
        2,
        10,
        '2024-09-14 14:00:00',
        'ABSENCE',
        'Paciente não compareceu à consulta',
        'Consulta agendada',
        'DISCUSSION_CIRCLE',
        'SESSION',
        'Paciente não justificou ausência',
        'Novo agendamento',
        NOW(),
        NOW()
    ),
    -- Agendamentos para o Dr. Pedro Almeida (psychologistId = 3)
    (
        3,
        11,
        '2024-09-15 09:30:00',
        'FINALIZED',
        'Avaliação inicial',
        'Primeira consulta',
        'GROUP',
        'SESSION',
        'Paciente com sintomas de ansiedade',
        'Reduzir ansiedade',
        NOW(),
        NOW()
    ),
    (
        3,
        12,
        '2024-09-16 10:30:00',
        'PENDING',
        'Sessão de terapia',
        'Terapia individual',
        'LECTURE',
        'SESSION',
        'Paciente precisa de acompanhamento',
        'Controle da ansiedade',
        NOW(),
        NOW()
    ),
    (
        3,
        13,
        '2024-09-17 11:30:00',
        'CONFIRMED',
        'Sessão de terapia',
        'Sessão de acompanhamento',
        'SEMINAR',
        'COLLECTIVE_ACTIVITIES',
        'Paciente apresentou leve melhora',
        'Monitorar progresso',
        NOW(),
        NOW()
    ),
    (
        3,
        14,
        '2024-09-18 13:00:00',
        'CANCELED',
        'Reunião cancelada',
        'Sessão cancelada',
        'MEETING',
        'ADMINISTRATIVE_RECORDS',
        'Reagendar',
        'Novo agendamento',
        NOW(),
        NOW()
    ),
    (
        3,
        15,
        '2024-09-19 14:00:00',
        'ABSENCE',
        'Falta à consulta',
        'Consulta agendada',
        'DISCUSSION_CIRCLE',
        'SESSION',
        'Paciente faltou',
        'Novo agendamento',
        NOW(),
        NOW()
    ),
    -- Agendamentos para a Dra. Ana Costa (psychologistId = 4)
    (
        4,
        16,
        '2024-09-20 10:00:00',
        'CONFIRMED',
        'Sessão de psicoterapia',
        'Acompanhamento semanal',
        'GROUP',
        'SESSION',
        'Paciente em acompanhamento',
        'Melhora contínua',
        NOW(),
        NOW()
    ),
    (
        4,
        17,
        '2024-09-21 11:00:00',
        'PENDING',
        'Consulta agendada',
        'Acompanhamento',
        'LECTURE',
        'SESSION',
        'Paciente precisa de suporte emocional',
        'Melhorar estado emocional',
        NOW(),
        NOW()
    ),
    (
        4,
        18,
        '2024-09-22 12:00:00',
        'CONFIRMED',
        'Sessão coletiva',
        'Sessão em grupo',
        'SEMINAR',
        'COLLECTIVE_ACTIVITIES',
        'Discussão em grupo',
        'Troca de experiências',
        NOW(),
        NOW()
    ),
    (
        4,
        19,
        '2024-09-23 14:00:00',
        'FINALIZED',
        'Avaliação final',
        'Conclusão de tratamento',
        'MEETING',
        'ADMINISTRATIVE_RECORDS',
        'Paciente finalizou acompanhamento',
        'Encerramento',
        NOW(),
        NOW()
    ),
    (
        4,
        20,
        '2024-09-24 15:00:00',
        'CANCELED',
        'Consulta cancelada',
        'Consulta',
        'DISCUSSION_CIRCLE',
        'SESSION',
        'Paciente solicitou cancelamento',
        'Reagendar',
        NOW(),
        NOW()
    ),
    -- Agendamentos para o Dr. Marcos Souza (psychologistId = 5)
    (
        5,
        21,
        '2024-09-25 09:00:00',
        'FINALIZED',
        'Sessão de acompanhamento',
        'Acompanhamento',
        'GROUP',
        'SESSION',
        'Paciente com sintomas de estresse',
        'Reduzir estresse',
        NOW(),
        NOW()
    ),
    (
        5,
        22,
        '2024-09-26 10:00:00',
        'PENDING',
        'Sessão de terapia',
        'Sessão individual',
        'LECTURE',
        'SESSION',
        'Paciente está em tratamento',
        'Controle de estresse',
        NOW(),
        NOW()
    ),
    (
        5,
        23,
        '2024-09-27 11:00:00',
        'CONFIRMED',
        'Sessão de acompanhamento',
        'Acompanhamento psicológico',
        'SEMINAR',
        'COLLECTIVE_ACTIVITIES',
        'Paciente apresentou leve melhora',
        'Apoio contínuo',
        NOW(),
        NOW()
    ),
    (
        5,
        24,
        '2024-09-28 13:00:00',
        'CANCELED',
        'Consulta cancelada',
        'Sessão cancelada',
        'MEETING',
        'ADMINISTRATIVE_RECORDS',
        'Reagendar sessão',
        'Novo agendamento',
        NOW(),
        NOW()
    ),
    (
        5,
        13,
        '2024-09-29 14:00:00',
        'ABSENCE',
        'Falta à consulta',
        'Consulta agendada',
        'DISCUSSION_CIRCLE',
        'SESSION',
        'Paciente não justificou ausência',
        'Reagendar sessão',
        NOW(),
        NOW()
    );

UPDATE "Patient"
SET
    "attachment" = '{"PEDAGOGICAL_REPORT"}'
WHERE
    id = 1;

UPDATE "Patient"
SET
    "attachment" = '{"MEDICAL_REPORT"}'
WHERE
    id = 2;

UPDATE "Patient"
SET
    "attachment" = '{"TEACHER_REPORT"}'
WHERE
    id = 3;

UPDATE "Patient"
SET
    "attachment" = '{"PROFESSIONAL_REPORT"}'
WHERE
    id = 4;

UPDATE "Patient"
SET
    "attachment" = '{"CORDENATION_REPORT"}'
WHERE
    id = 5;

UPDATE "Patient"
SET
    "attachment" = '{"DIRECTION_REPORT"}'
WHERE
    id = 6;

UPDATE "Patient" SET "attachment" = '{"ENAPI_REPORT"}' WHERE id = 7;

UPDATE "Patient"
SET
    "attachment" = '{"DIRECTION_EDUCATION_REPORT"}'
WHERE
    id = 8;

UPDATE "Patient"
SET
    "attachment" = '{"SPONTANEOUS_DECISION"}'
WHERE
    id = 9;

UPDATE "Patient" SET "attachment" = '{"OTHER"}' WHERE id = 10;

UPDATE "Patient"
SET
    "attachment" = '{"PEDAGOGICAL_REPORT"}'
WHERE
    id = 11;

UPDATE "Patient"
SET
    "attachment" = '{"MEDICAL_REPORT"}'
WHERE
    id = 12;

UPDATE "Patient"
SET
    "attachment" = '{"TEACHER_REPORT"}'
WHERE
    id = 13;

UPDATE "Patient"
SET
    "attachment" = '{"PROFESSIONAL_REPORT"}'
WHERE
    id = 14;

UPDATE "Patient"
SET
    "attachment" = '{"CORDENATION_REPORT"}'
WHERE
    id = 15;

UPDATE "Patient"
SET
    "attachment" = '{"DIRECTION_REPORT"}'
WHERE
    id = 16;

UPDATE "Patient" SET "attachment" = '{"ENAPI_REPORT"}' WHERE id = 17;

UPDATE "Patient"
SET
    "attachment" = '{"DIRECTION_EDUCATION_REPORT"}'
WHERE
    id = 18;

UPDATE "Patient"
SET
    "attachment" = '{"SPONTANEOUS_DECISION"}'
WHERE
    id = 19;

UPDATE "Patient" SET "attachment" = '{"OTHER"}' WHERE id = 20;

UPDATE "Patient"
SET
    "attachment" = '{"PEDAGOGICAL_REPORT"}'
WHERE
    id = 21;

UPDATE "Patient"
SET
    "attachment" = '{"MEDICAL_REPORT"}'
WHERE
    id = 22;

UPDATE "Patient"
SET
    "attachment" = '{"TEACHER_REPORT"}'
WHERE
    id = 23;

UPDATE "Patient"
SET
    "attachment" = '{"PROFESSIONAL_REPORT"}'
WHERE
    id = 24;

UPDATE "Patient"
SET
    "attachment" = '{"CORDENATION_REPORT"}'
WHERE
    id = 25;

INSERT INTO
    "Session" (
        "psychologistId",
        "patientId",
        "sessionDate",
        "intervention",
        "referrals",
        "complaint",
        "createdAt"
    )
VALUES (
        2,
        1,
        '2024-09-01T10:00:00Z',
        'Intervention 1',
        'Referral 1',
        'Complaint 1',
        '2024-09-01T10:00:00Z'
    ),
    (
        3,
        2,
        '2024-09-02T10:00:00Z',
        'Intervention 2',
        'Referral 2',
        'Complaint 2',
        '2024-09-02T10:00:00Z'
    ),
    (
        4,
        3,
        '2024-09-03T10:00:00Z',
        'Intervention 3',
        'Referral 3',
        'Complaint 3',
        '2024-09-03T10:00:00Z'
    ),
    (
        5,
        4,
        '2024-09-04T10:00:00Z',
        'Intervention 4',
        'Referral 4',
        'Complaint 4',
        '2024-09-04T10:00:00Z'
    ),
    (
        2,
        5,
        '2024-09-05T10:00:00Z',
        'Intervention 5',
        'Referral 5',
        'Complaint 5',
        '2024-09-05T10:00:00Z'
    ),
    (
        3,
        6,
        '2024-09-06T10:00:00Z',
        'Intervention 6',
        'Referral 6',
        'Complaint 6',
        '2024-09-06T10:00:00Z'
    ),
    (
        4,
        7,
        '2024-09-07T10:00:00Z',
        'Intervention 7',
        'Referral 7',
        'Complaint 7',
        '2024-09-07T10:00:00Z'
    ),
    (
        5,
        8,
        '2024-09-08T10:00:00Z',
        'Intervention 8',
        'Referral 8',
        'Complaint 8',
        '2024-09-08T10:00:00Z'
    ),
    (
        2,
        9,
        '2024-09-09T10:00:00Z',
        'Intervention 9',
        'Referral 9',
        'Complaint 9',
        '2024-09-09T10:00:00Z'
    ),
    (
        3,
        10,
        '2024-09-10T10:00:00Z',
        'Intervention 10',
        'Referral 10',
        'Complaint 10',
        '2024-09-10T10:00:00Z'
    ),
    (
        4,
        11,
        '2024-09-11T10:00:00Z',
        'Intervention 11',
        'Referral 11',
        'Complaint 11',
        '2024-09-11T10:00:00Z'
    ),
    (
        5,
        12,
        '2024-09-12T10:00:00Z',
        'Intervention 12',
        'Referral 12',
        'Complaint 12',
        '2024-09-12T10:00:00Z'
    ),
    (
        2,
        13,
        '2024-09-13T10:00:00Z',
        'Intervention 13',
        'Referral 13',
        'Complaint 13',
        '2024-09-13T10:00:00Z'
    ),
    (
        3,
        14,
        '2024-09-14T10:00:00Z',
        'Intervention 14',
        'Referral 14',
        'Complaint 14',
        '2024-09-14T10:00:00Z'
    ),
    (
        4,
        15,
        '2024-09-15T10:00:00Z',
        'Intervention 15',
        'Referral 15',
        'Complaint 15',
        '2024-09-15T10:00:00Z'
    ),
    (
        5,
        16,
        '2024-09-16T10:00:00Z',
        'Intervention 16',
        'Referral 16',
        'Complaint 16',
        '2024-09-16T10:00:00Z'
    ),
    (
        2,
        17,
        '2024-09-17T10:00:00Z',
        'Intervention 17',
        'Referral 17',
        'Complaint 17',
        '2024-09-17T10:00:00Z'
    ),
    (
        3,
        18,
        '2024-09-18T10:00:00Z',
        'Intervention 18',
        'Referral 18',
        'Complaint 18',
        '2024-09-18T10:00:00Z'
    ),
    (
        4,
        19,
        '2024-09-19T10:00:00Z',
        'Intervention 19',
        'Referral 19',
        'Complaint 19',
        '2024-09-19T10:00:00Z'
    ),
    (
        5,
        20,
        '2024-09-20T10:00:00Z',
        'Intervention 20',
        'Referral 20',
        'Complaint 20',
        '2024-09-20T10:00:00Z'
    );