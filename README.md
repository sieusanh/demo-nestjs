# demo-nestjs





## OVERVIEWS
+ Controller
+ Service
+ Repository (TypeORM)
+ Middleware 
+ Exception filters
+ Pipes
+ Guards
+ Interceptors
+ Swagger



## Applied code
+ Base Module
+ Alternative key for common primary key between SQL table and NoSQL Collections

## Models
HR Account
CREATE TABLE hr_accounts (
    id SERIAL PRIMARY KEY,
    key VARCHAR(20) NOT NULL UNIQUE GENERATED ALWAYS AS ('ACC0' || id::text) STORED,
    status SMALLINT,
    "createdBy" VARCHAR(20),
    "updatedBy" VARCHAR(20),
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE,

    username VARCHAR(50) UNIQUE,
    email VARCHAR(50) UNIQUE,
    password VARCHAR(50),
    "employeeId" VARCHAR(20) NOT NULL UNIQUE,
    "lastLoginAt" TIMESTAMP WITH TIME ZONE
)

HR Employee
CREATE TABLE hr_employees (
    id SERIAL PRIMARY KEY,
    key VARCHAR(20) NOT NULL UNIQUE GENERATED ALWAYS AS ('ACC0' || id::text) STORED,
    status SMALLINT,
    "createdBy" VARCHAR(20),
    "updatedBy" VARCHAR(20),
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE,

    name VARCHAR(255),
    phone VARCHAR(20) UNIQUE,
    avatar VARCHAR(255),
    email VARCHAR(50) UNIQUE,
    gender VARCHAR(20),
    "birthDay" TIMESTAMP WITH TIME ZONE,
    salary REAL,
    role VARCHAR(20),
    "managerId" VARCHAR(20) REFERENCES hr_employees(key),
    "positionId" VARCHAR(20) REFERENCES erp_positions(key),
    "departmentId" VARCHAR(20) REFERENCES erp_departments(key),
    "projectIds" VARCHAR[]
    -- FOREIGN KEY (EACH ELEMENT OF "projectIds") REFERENCES erp_projects(key),    
)

ERP Position
CREATE TABLE erp_positions (
    id SERIAL PRIMARY KEY,
    key VARCHAR(20) NOT NULL UNIQUE GENERATED ALWAYS AS ('ACC0' || id::text) STORED,
    status SMALLINT,
    "createdBy" VARCHAR(20),
    "updatedBy" VARCHAR(20),
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE,

    name VARCHAR(255),
    skills VARCHAR[]
)

ERP Department
CREATE TABLE erp_departments (
    id SERIAL PRIMARY KEY,
    key VARCHAR(20) NOT NULL UNIQUE GENERATED ALWAYS AS ('ACC0' || id::text) STORED,
    status SMALLINT,
    "createdBy" VARCHAR(20),
    "updatedBy" VARCHAR(20),
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE,

    name VARCHAR(255),
    "managerId" VARCHAR(20)
)

ERP Project
CREATE TABLE erp_projects (
    id SERIAL PRIMARY KEY,
    key VARCHAR(20) NOT NULL UNIQUE GENERATED ALWAYS AS ('ACC0' || id::text) STORED,
    status SMALLINT,
    "createdBy" VARCHAR(20),
    "updatedBy" VARCHAR(20),
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    name VARCHAR(255),
    "managerId" VARCHAR(20),
    amount integer
)

Relation Employee Project
CREATE TABLE rel_employees_projects (
    id SERIAL PRIMARY KEY,
    status SMALLINT,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    "employeeKey" VARCHAR(20) REFERENCES hr_employees(key), 
    "projectKey" VARCHAR(20) REFERENCES erp_projects(key)
)

ERP Tasks
CREATE TABLE erp_tasks (
    id SERIAL PRIMARY KEY,
    key VARCHAR(20) NOT NULL UNIQUE GENERATED ALWAYS AS ('ACC0' || id::text) STORED,
    status SMALLINT,
    "createdBy" VARCHAR(20),
    "updatedBy" VARCHAR(20),
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    title VARCHAR(255),
    "startDate" TIMESTAMP WITH TIME ZONE,
    "endDate" TIMESTAMP WITH TIME ZONE,
    progress SMALLINT,
    priority SMALLINT,
    tags VARCHAR[],
    "assigneeId" VARCHAR(20) REFERENCES hr_employees(key),
    "assignerId" VARCHAR(20) REFERENCES hr_employees(key),
    "projectId" VARCHAR(20) REFERENCES erp_projects(key),
    "parentTaskId" VARCHAR(20) REFERENCES erp_tasks(key)
)


## Issues:
+ Error: dependency circulus
+ import relative path instead of "from '.' "

https://stackoverflow.com/questions/72393168/in-the-next-major-version-nest-will-not-allow-classes-annotated-with-injectabl


nestjs service on another service
https://stackoverflow.com/questions/51819504/inject-nestjs-service-from-another-module


Unable to get class properties
https://stackoverflow.com/questions/75057430/how-to-list-properties-of-a-nestjs-dto-class


typescript get class properties with empty values
https://stackoverflow.com/questions/53430373/how-to-get-properties-of-a-class-with-empty-constructor-using-typescript-in-the



## References:

https://stackoverflow.com/questions/41054507/postgresql-array-of-elements-that-each-are-a-foreign-key

Base Service
https://stackoverflow.com/questions/51056158/nestjs-create-base-crud-service

