create database CafeMgm
use CafeMgm

create table [Users]
(
UserId int primary key identity(1,1) not null,
Name nvarchar(50) null,
Username varchar(50) null unique,
Mobile varchar(50) null unique check(Mobile like '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'),
Email varchar(50) null unique,
Address varchar(max) null,
PostCode varchar(50) null,
Password varchar(50) null,
ImageUrl varchar(max) null,
CreatedDate datetime null
)
select * from Users

create table [Contact]
(
ContactId int primary key identity(1,1) not null,
Name varchar(50) null,
Email varchar(50) null,
Subject varchar(200) null,
Message varchar(max) null,
CreatedDate datetime null
)

create table [Categories]
(
CategoryId int primary key identity(1,1) not null,
Name varchar(50) null,
ImageUrl varchar(max) null,
IsActive bit null,
CreatedDate datetime null
)

create table [Products]
(
ProductId int primary key identity(1,1) not null,
Name varchar (50) null,
Description varchar(max) null,
Price decimal(18,2) null,
Quantity int null,
ImageUrl varchar(max) null,
CategoryId int foreign key references Categories(CategoryId) on delete cascade, --FK
IsActive bit null,
CreatedDate datetime null
)

create table [Carts]
(
CartId int primary key identity(1,1) not null,
ProductId int foreign key references Products(ProductId) on delete cascade, --FK
Quantity int null,
UserId int foreign Key references Users(UserId) null --FK
)

create table [Orders]
(
OrderDetailsId int primary key identity(1,1) not null,
OrderNo varchar (max) null,
ProductId int foreign key references Products(ProductId) on delete cascade, --FK
Quantity int null,
UserId int foreign key references Users(USerId) on delete cascade , --FK
Status varchar(50) null,
PaymentId int foreign key references Payment(PaymentId) on delete cascade, --FK
OrderDate datetime null
)



create table [Payment]
(
PaymentId int primary key identity(1,1) not null,
Name varchar(50) null,
CardNo varchar(50) null,
ExpiryDate varchar(50) null,
CvvNo int null,
Address varchar(max) null,
PaymentMode varchar(50) null
)
