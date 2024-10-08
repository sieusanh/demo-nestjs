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

## Routes


## Applied code
+ Base Controller, Base Service, Base Dto, Base Entity
+ Alternative key for common primary key between SQL table and NoSQL Collections
+ RBAC 
+ Clean Code, Scalable code


## Models. Please check file src/common/migrations/database.ts

## Modules              Endpoints                  Constraints
HR Account              /hr/accounts

HR Employee             /hr/employees

ERP Position            /erp/positions

ERP Department          /erp/departments

ERP Project             /erp/projects

ERP Tasks               /erp/tasks


Relation Employee Project


## Issues:
+ Error: dependency circulus
+ import relative path instead of "from '.' "

https://wanago.io/2022/02/28/api-nestjs-circular-dependencies/

https://stackoverflow.com/questions/72393168/in-the-next-major-version-nest-will-not-allow-classes-annotated-with-injectabl


nestjs service on another service
https://stackoverflow.com/questions/51819504/inject-nestjs-service-from-another-module


Unable to get class properties
https://stackoverflow.com/questions/75057430/how-to-list-properties-of-a-nestjs-dto-class


typescript get class properties with empty values
https://stackoverflow.com/questions/53430373/how-to-get-properties-of-a-class-with-empty-constructor-using-typescript-in-the

Swagger
ApiExtraModels
https://stackoverflow.com/questions/61143316/nestjs-swagger-what-model-is-the-apiextramodel-expecting-as-a-parameter


## References:

https://stackoverflow.com/questions/41054507/postgresql-array-of-elements-that-each-are-a-foreign-key

Base Service
https://stackoverflow.com/questions/51056158/nestjs-create-base-crud-service


