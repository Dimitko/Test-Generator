# Test-Generator
Web 2020 course project


### Tasks

1. Watch and study fullstack demo https://github.com/ngadzheva/WebTechnologies-labs-KN20/tree/main/full-stack%20demo
2. Setup the demo project with XAMPP, and play around with it (we can ask ngadzheva)
3. Set-up project structure and skeleton na server
	a) Echo JSON request with JSON response
4. Entities:
	- Topic
	- Question
	- Update Echo functionality:
		- JSON request with entity
		- Decode JSON entity into PHP entity
		- Encode and return
5. Database connection:
	- functions, that create and execute queries to the database
6. Clear-up API
	```
		localhost/api.php/topic/create
		localhost/api.php/topic/update
		localhost/api.php/question/create
		...
		localhost/api.php/question/delete
		(After that split between people)
	```
7. Generate test:
	- JSON request, topic number
	```
	 	{
	 		topic_number: ...,
	 		question_number: 5
	 	}
	 ```
	- JSON response
	```
		{
			topic_number: ..,
			topic_name: ..,
			questions: [
				{
					"question_text": "How many legs does a human have?"
					"answ_1": 1,
					"answ_2": 2,
					"answ_3": 11,
					"answ_4": 0,
				},
				{},
				{},
			]
		}
	```
8. Submit test
  - JSON request
  	```
  		{
			topic_number: ..,
			topic_name: ..,
			questions: [
				{
					"question_text": "How many legs does a human have?"
					"answ_1": 1,
					"answ_2": 2,
					"answ_3": 11,
					"answ_4": 0,
					"selected": "answ_1"
				},
				{},
				{},
			]
		}
	```
	- JSON response
	```
		{
			topic_number: ..,
			topic_name: ..,
			questions: [
				{
					"question_text": "How many legs does a human have?"
					"answ_1": 1,
					"answ_2": 2,
					"answ_3": 11,
					"answ_4": 0,
					"selected": "answ_1"
					"is_correct": false
				},
				{},
				{},
			]
			"score": 9
		}
	```

ЛИНК КЪМ ТЕСТОВОТО REPOSITORY:

https://github.com/vladimarkova/mypoetry

### Contributions

1. Vladi
  - Комуникация с Милен (тестови данни, изисквания, etc.)
	- Създаде Topic таблица
	- Начален прототип
	- Участва в изчистване на модела на базата
2. Mitko
	- Участва в изчистване на модела на базата
3. Georgi
	- Демо на phpMyAdmin за основни интеракции с базата
	- feed и изчистване на тестовите данни
	- Участва в изчистване на модела на базата
	- Раработва generate / submit test функционалността
	- Тестване чрез Postman
	-
	- submitTest
	- При грешен отговор:
	-	- (/) да върне верния
	-	- (/) да даде feedback
	- При верен отговор:
	-	- (/) да даде feedback
	1. (X)buildTestWithQuestion - да разбърква отговорите на въпросите
	1. (/) buildTestWithQeustions - да взима само някакъв брой от въпроси
	2. (X) makeTest - да приема аргумент за броя на въпросите за теста




### Tasks

1. Mitko
	- Submit question
	- Get question
	- Get all questions for topic (+ vernite otgovori)
	- Think about History model in the DB

2. Georgi
		submitTest
		При грешен отговор:
			- (/) да върне верния
			- (/) да даде feedback
		При верен отговор:
			- (/) да даде feedback
	1. (X)buildTestWithQuestion - да разбърква отговорите на въпросите
	1. (/) buildTestWithQeustions - да взима само някакъв брой от въпроси
	2. (X) makeTest - да приема аргумент за броя на въпросите за теста




### Backlog
1. Експорт/Импорт въпроси
1. Статистика на база потребителска роля
1. Тест на база тип въпрос (предварителен, по време на презентация, след презентация) (/)
1. Администраторски панел, за импорт експорт на данни + статистика
1. История - кой за коя тема за кой въпрос колко пъти е отговорил правилно, колко пъти отговорил грешно
--------------------------------------------------------------------------------------------------------------
1. Form validations + Backend validations
2. Server returning {success, message}
1. Allow only requests for api/ folder
1. Error handling for unexisting topic
5. Incoming content type != application/json should not result in an internal server error - it's a client error
1. Find a way to improve/simplify the 'Test-Generatr' slug/url part.
1. Create a file with constants
1. Create a file with utility functions
1. Рефакториране на основните функции да връщат стойност, а само една външна да прави echo
2. SQL select by title for topic (използваме ? за заглавието)
3. Otdelna funkciq za connectvane kam bazata
4. UNit tests/Automated Tests for PHP?









