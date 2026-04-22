create database FamiliaCarranzaHernandez;
use FamiliaCarranzaHernandez;

CREATE TABLE integrantes (
    id_integrante INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE,
    parentesco VARCHAR(30),
    telefono VARCHAR(20),
    sexo CHAR(1) -- 'M' para masculino, 'F' para femenino
);

INSERT INTO integrantes (nombre, apellido, fecha_nacimiento, parentesco, telefono, sexo) VALUES 
('Francisco Javier', 'Carranza Bernal', '1975-08-18', 'Padre', '8145139871', 'M'),
('Irene', 'Hernandez de la Rosa', '1977-07-25', 'Madre', '8126745698', 'F'),
('Erick Ivan', 'Carranza Hernandez', '2002-01-11', 'Hermano', '8156784203', 'M'),
('Mauricio', 'Carranza Hernandez', '2004-12-16', 'Hermano', '8198785641', 'M'),
('Hector Israel', 'Carranza Hernandez', '2012-08-15', 'Hermano', '8126547808', 'M'),
('Francisco Javier', 'Carranza Hernandez', '1999-06-18', '-', '8198785641', 'M');

select * from integrantes;