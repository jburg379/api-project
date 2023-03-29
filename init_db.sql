DROP TABLE IF EXISTS Anime;
CREATE TABLE  Anime (
    AnimeID INTEGER PRIMARY KEY,
    AnimeName TEXT NOT NULL, 
    Author TEXT NOT NULL,
    Year INTEGER NOT NULL, 
    Seasons INTEGER NOT NULL
);

INSERT INTO Anime (AnimeName, Author, Year, Seasons) VALUES ('Attack on Titan', 'Hajime Isayama', 2013, 4);
INSERT INTO Anime (AnimeName, Author, Year, Seasons) VALUES ('Inuyasha', 'Rumiko Takahashi', 2000, 7);
INSERT INTO Anime (AnimeName, Author, Year, Seasons) VALUES ('Naruto', 'Masashi Kishimoto', 2002, 5);
INSERT INTO Anime (AnimeName, Author, Year, Seasons) VALUES ('Arifureta', 'Ryo Shirakome', 2019, 2);
INSERT INTO Anime (AnimeName, Author, Year, Seasons) VALUES ('Noragami', 'Adachitoka', 2014, 2);
INSERT INTO Anime (AnimeName, Author, Year, Seasons) VALUES ('Mushoku Tensei', 'Rifunji na Magonote', 2021, 1);
INSERT INTO Anime (AnimeName, Author, Year, Seasons) VALUES ('The Rising of The Shield Hero', 'Aneko Yusagi', 2019, 1);
INSERT INTO Anime (AnimeName, Author, Year, Seasons) VALUES ('Overlord', 'Kugame Maruyama', 2016, 3);

DROP TABLE IF EXISTS Manga;
CREATE TABLE Manga (
    MangaID INTEGER PRIMARY KEY,
    MangaName TEXT NOT NULL,
    Author TEXT NOT NULL,
    Year INTEGER NOT NULL,
    Volumes INTEGER NOT NULL
);

INSERT INTO Manga (MangaName, Author, Year, Volumes) VALUES ("Hell's Paradise", 'Yuji Kaku', 2018, 13);
INSERT INTO Manga (MangaName, Author, Year, Volumes) VALUES ('Attack on Titan', 'Hajime Isayama', 2009, 34);
INSERT INTO Manga (MangaName, Author, Year, Volumes) VALUES ('Inuyasha', 'Rumiko Takahashi', 1996, 56);
INSERT INTO Manga (MangaName, Author, Year, Volumes) VALUES ('Naruto', 'Masashi Kishimoto', 1999, 72);
INSERT INTO Manga (MangaName, Author, Year, Volumes) VALUES ('Arifureta', 'Ryo Shirakome', 2016, 9);
INSERT INTO Manga (MangaName, Author, Year, Volumes) VALUES ('Noragami', 'Adachitoka', 2014, 24);