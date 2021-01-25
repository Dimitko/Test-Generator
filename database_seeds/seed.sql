-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 25, 2021 at 09:30 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testgenerator`
--

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `id` int(11) NOT NULL,
  `timestamp` datetime DEFAULT NULL,
  `fn` int(11) DEFAULT NULL,
  `topic_id` int(6) UNSIGNED NOT NULL,
  `question_nr` tinyint(4) DEFAULT NULL,
  `aim` text DEFAULT NULL,
  `question_text` text DEFAULT NULL,
  `option_1` text DEFAULT NULL,
  `option_2` text DEFAULT NULL,
  `option_3` text DEFAULT NULL,
  `option_4` text DEFAULT NULL,
  `answer` tinyint(4) DEFAULT NULL,
  `difficulty` tinyint(4) DEFAULT NULL,
  `feedback_correct` text DEFAULT NULL,
  `feedback_incorrect` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `type` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`id`, `timestamp`, `fn`, `topic_id`, `question_nr`, `aim`, `question_text`, `option_1`, `option_2`, `option_3`, `option_4`, `answer`, `difficulty`, `feedback_correct`, `feedback_incorrect`, `notes`, `type`) VALUES
(1, '2013-04-02 12:12:26', 9999, 0, 1, 'Да провери колко време отнема писането на реферат по WWW.', 'Колко време според вас отнема писането на реферат по WWW технологии?', '20+ часа', '10 часа', '5 часа', '1 час', 1, 5, 'Браво! Наистина времето за писане на един реферат е между 20 и 30 часа. Виж информацията в мудъл за разпределението по часове.', 'Далече от истината! Времето за писане на един реферат е между 20 и 30 часа. Виж информацията в мудъл за разпределението по часове.', 'Виж: http://moodle.le.tsdoit.org/pluginfile.php/842/mod_forum/attachment/139/wwwTech_Evaluation_Instructions_v3.pdf', NULL),
(2, '2013-04-23 16:46:06', 61524, 0, 1, 'Да се разбере дали студентите са наясно с APM', 'Какво е APM?', 'аpplication performance management', 'automatic performance management', 'application project management', 'automatic project management', 1, 3, 'Верен отговор! За повече информация по темата виж секция 4.1. от реферата.', 'Грешен отговор! За повече информация по темата виж секция 4.1. от реферата.', 'http://en.wikipedia.org/wiki/Application_Performance_Management', 3),
(3, '2013-04-23 16:52:06', 61524, 0, 2, 'Да се проверят елементарните знания за dynaTrace.', 'На коя компания принадлежи dynaTrace', 'Compuware', 'Compusoft', 'VMware', 'SAP', 1, 2, 'Верен отговор! За повече информация виж секция 4.2. от реферата.', 'Грешен отговор! За повече информация виж секция 4.2. от реферата', 'http://www.compuware.com/application-performance-management/dynatrace-test-center.html', 3),
(4, '2013-04-23 17:00:46', 61524, 0, 3, 'Да се определят знанията след презентацията ', 'Как се нарича патентовата технология за тестване на dynaTrace?', 'PurePath', 'PathPure', 'CleanPath', 'PathClean', 1, 1, 'Верен отговор! За повече информация по темата виж секция 4.2.4. от реферата.', 'Грешен отговор! За повече информация по темата виж секция 4.2.4. от реферата', 'http://www.compuware.com/application-performance-management/compuware-apm.html', 3),
(5, '2013-04-23 17:16:53', 61524, 0, 4, 'Да се определи нивото на знания за версиите на dynaTrace.', 'Кое от следните е версия на dynaTrace?', 'Test Center Edition', 'Tester Edition', 'Ultra Test Edition', 'Testing Center Edition', 1, 4, 'Верен отговор. За повече информация по темата виж секция 4.2 от реферата.', 'Грешен отговор. За повече информация по темата виж секция 4.2 от реферата.', 'http://www.compuware.com/application-performance-management/compuware-apm.html', 3),
(6, '2013-04-23 17:23:43', 61524, 0, 5, 'Да се установи нивото на знания на студентите относно dynaTrace Ajax Edition', 'Как се казва безплатната версия на dynaTrace?', 'Ajax Edition', 'Test Centurion Edition', 'Free Edition', 'Tester Edition', 1, 4, 'Верен отговор! За повече информация по темата виж секция 4.3 от реферата.', 'Грешен отговор! За повече информация по темата виж секция 4.3 от реферата.', 'http://www.compuware.com/application-performance-management/dynatrace-test-center.html', 3),
(7, '2013-04-24 11:23:01', 61529, 0, 1, 'Да установи дали някой е използвал JMeter, има опит с него или е заинтересовам от приложението', 'Някой знае ли как се стартира JMeter ', 'Да', 'Не', 'Мисля, че мога да го стартирам', 'Това нещо не е инсталирано и не работи', 1, 1, 'За повече информация посетете сайта на apache JMeter: http://jmeter.apache.org/', 'Виж секцията \'\'Как да се сдобием и инсталираме Apache JMeter\'\' от реферата !', 'Ако сме на друга операционна система различна от Windows, файл с какво разширение трябва да стартираме.', 1),
(8, '2013-04-24 11:31:12', 61529, 0, 2, 'Да установи дали аудиторията знае как и какво е нужно, за да \'\'подкарат\'\' приложението.', 'Нужно ли е да имаме инсталирана програма на нашата машина, за да може Apache JMeter да работи след като го свалим ?!?', 'Да, нужно е да имаме JVM v.6 или по-нова.', 'Не, трябва само да инсталираме JMeter', 'Трябва да ползваме Windows като операционна система', 'Нужно е да имаме инсталиран Google Chrome ', 1, 1, 'Браво !', 'Грешка, слушай  и чети повече !', 'Въпроса няма особености .', 3),
(9, '2013-04-24 11:38:20', 61529, 0, 3, 'Да установи дали аудиторията е придобила някакви знания от реферата( или пък дали вече не разполага с тези знания от допълнителни източници)', 'Apache JMeter може да се ползва единствено за тестване на Web приложения', 'Не, това не е вярно', 'Да, това е вярно', 'Може да се използва  за тестване на Web приложения и Java обекти само', 'С apache JMeter не можем да тестваме нищо, може само да симулираме разни натоварвания върху различни програми и сървъри', 1, 3, 'Отлично.За  повече информация погледни в реферата или на адрес http://jmeter.apache.org/', 'Грешка! Виж характеристиките и разясненията за JMeter в реферата или прочети повече на официалния сайт.', 'няма особености\nлинк към официалния сайт: http://jmeter.apache.org/', 3),
(10, '2013-04-24 11:46:45', 61529, 0, 4, 'Да установи дали аудиторията е придобила някакви знания от реферата ( или пък вече ги е имала)', 'Прибавянето на нови елементи става единствено като кликнем с десен бутон  върху елемент от дървото (tree) и изберем нов елемент от ‘’add’’ листа.', 'Не, това не е вярно.Нови елементи могат да бъдат добавени алтернативно и чрез опциите \'\'merge\'\' или \'\'open\'\'.', 'Елементите се добавят сами в зависимост от това какъв тест искаме да пуснем.', 'Да, това е единствения начин.', 'Някои тестове и симулаии не разполагат с елементи, а само с готови статистики и графики с готовата информация/', 1, 3, 'Отлично! Прочел си правилно :)', 'Грешка.Елементите са основни за всички функционалности на JMeter и могат да се добавят и чрез open и merge също.', 'Ако аз съм объркал нещо, моля да ме извините :) :D\n', 1),
(11, '2013-04-24 11:55:18', 61529, 0, 5, 'Да установи дали са придобити някакви знания от реферата.', 'Кои елементи са начална точка за всеки един тестови план в Apache JMeter ?', 'Това са елементите на нишковите групи (thread groups)', 'Това са Controllers and Samplers', 'Всички елементи могат да се разглеждат като начална точка на тестовия план.', 'Това са таймерите.', 1, 4, 'Отлично! Разбрал си, че без елементите на нишковата група не може да се започне нов тестови план.Винаги имаме поне един thread !!!', 'Погледни по-добре реферата :P ', 'В реферата не са описани всички елементи на Apache JMeter, а само някои от най-важните !!!', 3),
(12, '2013-04-27 12:05:45', 61446, 0, 1, 'Разбрано ли е какво точно е JSP', 'Кое не е предимство на JSP в сравнвние с други технологии?', 'Предимство на JSP срещу АSP  е, че е написана на Java', 'Предимство на JSP срещу Static HTML   е, че е не съдържа динамична информация', 'Предимство на JSP срещу SSI  е, че се използва в по-големи  и сложни програми', 'Предимство на JSP срещу JavaScript  е, че има достъп до база данни', 2, 3, 'Това е правилният отговор!', 'Вие отговорихте грешно!\nМоля, погледнете секцията: Предимства на JSP в сравнвние с други технологии', 'http://www.tutorialspoint.com/jsp/ ', 3),
(13, '2013-04-27 12:10:02', 61446, 0, 2, 'Разбран ли е синтаксисът на JSP', 'Кое от следните е синтаксис на Scriptlet?', '<% code fragment %>', '<%= expression %>', '<%@ page ... %>', '<%@ page attribute=\"value\" %>', 1, 3, 'Поздравление,това е правилният отговор!', 'Грешен отговор! \nМоля, погледнете JSP- синтаксис!', 'http://www.tutorialspoint.com/jsp/ ', 3),
(14, '2020-11-21 09:45:18', 81271, 0, 1, 'Разлика между синхронни и асинхронни заявки', 'Кое от следните твърдения е вярно?', 'Синхронният код би блокирал по-нататъшно изпълнение на определена част от кода на програмата, докато не приключи текущото. Асинхронният позволява те да бъдат изпълнявани веднага ', 'Погледнато в една по-обща картина, използването на синхронни вместо асинхронни заявки не би довело до значително забавяне и рефлектиране върху потребителския интерфейс', 'При използване на синхронни заявки по-нататъшното изпълнение на програмния код би продължило както обикновено, независимо дали текущият код се е изпълнил', 'Асинхронният код би блокирал по-нататъшно изпълнение на определена част от кода на програмата, докато не приключи текущото. Синхронният позволява те да бъдат изпълнявани веднага ', 1, 1, 'Отлично! За повече информация виж секция \"Синхронни и асинхронни заявки\" от реферата. ', 'Не е така! За повече информация виж секция \"Синхронни и асинхронни заявки\" от реферата. ', 'https://www.w3schools.com/xml/ajax_intro.asp', 3),
(15, '2020-11-21 10:05:24', 81271, 0, 2, 'XHR', 'XMLHttpRequests(XHR) са обекти за асинхронно извличане на данни. Кое от следните твърдения относно тях е вярно?', 'При работа с XHR се нуждаем от два слушателя, които да отговарят за случаите на успех и грешка, както и от извикване на open и send', 'Освен за извличане на XML данни през HTTP,  XHR може да се ползва и с протоколи, различни от HTTP, както и да извлича данни в различен от XML формат, например JSON, HTML или plain text, още от създаването му', 'При използване на XHR не се нуждаем от слушатели, които да се занимават с обработката на случаите на успех и грешка', 'За събитията, свързани с асинхронната обработка чрез XHR, е вярно, че abort настъпва при откриване на грешка, load настъпва, когато заявката започне да зарежда данните', 1, 3, 'Отлично! За повече информация виж секция \"XHR\" на реферата.', 'Не е така! За повече информация виж секция \"XHR\" на реферата.', 'https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest', 3),
(16, '2020-11-21 10:42:35', 81271, 0, 3, 'AJAX', 'Имайки предвид AJAX концепцията за работа с данни, коя подредба на основните стъпки е правилна?', 'Появява се събитие на уеб страницата(страница е заредена или бутон е натиснат); \nJavaScript създава XMLHttpRequest обект; \nXMLHttpRequest обектът изпраща заявка към сървъра; \nСървърът обработва заявката; \nСървърът изпраща отговор обратно към уеб страницата; \nОтговорът се прочита от JavaScript; \nJavaScript изпълнява подходящото действие(като например обновяване на страницата)', 'JavaScript създава XMLHttpRequest обект; \nПоявява се събитие на уеб страницата(страница е заредена или бутон е натиснат); \nJavaScript изпълнява подходящото действие(като например обновяване на страницата)\nXMLHttpRequest обектът изпраща заявка към сървъра; \nСървърът обработва заявката; \nОтговорът се прочита от JavaScript; \nСървърът изпраща отговор обратно към уеб страницата; ', 'JavaScript създава XMLHttpRequest обект; \nJavaScript изпълнява подходящото действие(като например обновяване на страницата)\nXMLHttpRequest обектът изпраща заявка към сървъра; \nПоявява се събитие на уеб страницата(страница е заредена или бутон е натиснат); \nСървърът обработва заявката; \nСървърът изпраща отговор обратно към уеб страницата; \nОтговорът се прочита от JavaScript; ', 'Появява се събитие на уеб страницата(страница е заредена или бутон е натиснат); \nJavaScript изпълнява подходящото действие(като например обновяване на страницата)\nJavaScript създава XMLHttpRequest обект; \nXMLHttpRequest обектът изпраща заявка към сървъра; \nСървърът обработва заявката; \nСървърът изпраща отговор обратно към уеб страницата; \nОтговорът се прочита от JavaScript; \n', 1, 2, 'Отлично! За повече информация виж секция \"Преди и след AJAX\" на реферата.   ', 'Не е така! За повече информация виж секция \"Преди и след AJAX\" на реферата. ', 'https://www.w3schools.com/xml/ajax_intro.asp', 3),
(17, '2020-11-21 11:04:32', 81271, 0, 4, 'Callback функции ', '      В дадения по-долу фрагмент от програмен код какво трябва да пише на мястото на \'?\' в случай на успех, тоест каква стойност трябва да има req.status? \nfunction getFile(myCallback) {\n        let req = new XMLHttpRequest();\n        req.open(\'GET\', \"mycar.html\");\n        req.onload = function() {\n          if (req.status == ?) {\n            myCallback(this.responseText);\n          } else {\n            myCallback(\"Error: \" + req.status);\n          }\n        }\n        req.send();\n      }', '200', '100', '20', '1', 1, 3, 'Отлично! За повече информация виж секция \"Callback функции\" на реферата.', 'Не е така! За повече информация виж секция \"Callback функции\" на реферата.', 'https://blog.avenuecode.com/callback-hell-promises-and-async/await', 3),
(18, '2020-11-21 12:46:32', 81271, 0, 5, 'Fetch API', 'Кое от следните твърдения е вярно?', 'fetch() приема само един задължителен аргумент - пътят към ресурса, който искаме да извлечем', 'Ако направим сравнение на XMLHttpRequest(XHR) и Fetch API като техники за обработка на асинхронни заявки, може да кажем, че работата с XHR е много по-лека и по-бърза в сравнение с използването на Fetch API', 'Не е вярно, че може, съдавайки обект от тип заявка с Request конструктора, да подадем него като аргумент на fetch(), вместо да предаваме url-а на ресурса във fetch извикването', 'При работа с Fetch API може да ни се наложи да специфицираме заявката, но методът fetch() не може да приема параметър за тази цел', 1, 3, 'Отлично! За повече информация по темата виж секция \"Fetch API\" на реферата.', 'Не е така! За повече информация по темата виж секция \"Fetch API\" на реферата.', 'ttps://medium.com/beginners-guide-to-mobile-web-development/the-fetch-api-2c962591f5c', 3),
(19, '2020-11-21 13:06:53', 81271, 0, 6, 'Promises', 'Promise е обект, който представлява нещо, което ще бъде достъпно в бъдещето. В основата си работят със събития във времето. Кое от следните е невярно?', 'Състоянията, които класифицират събитията, с които Promises работят, са две - Fullfiled(Успешни) и Rejected(Отхвърлени) ', 'Всеки Promise наследява два основни метода - then() и catch(). Методът then() от върнатия обект ни позволява да добавим обработчик на събития, т.нар. event handler.', 'chaining е понятие, което имаме основание да свържем с Promises', 'При работа с Promises, въпреки удобството, може да твърдим, че остава възможността за попадане в ситуацията на т.нар. callback hell ', 1, 3, 'Отлично! За повече информация по темата виж секция \"Promises\" на реферата.', 'Не е така! За повече информация по темата виж секция \"Promises\" на реферата.', 'https://developers.google.com/web/updates/2015/03/introduction-to-fetch', 3),
(20, '2020-11-21 14:21:52', 81271, 0, 7, 'Async/Await', 'Async/Await е една възможност за работа с Promises. Кое от следните твърдения е вярно?', 'В самата async функция може да имаме няколко await функции(пред тях стои ключовата дума await)', 'Async/Await невинаги ни позволява да пишем Promises, които са основани на асинхронен код, нправейки го да изглежда и да се държи до голяма степен като синхронен ', 'За да достъпим резултата, върнат от async функциите, използваме метода then() на обекта от типа Promise', 'В самата async функция може да има само една await функция(пред нея стои ключовата дума await)', 1, 2, 'Отлично! За повече информация по темата виж секция \"Async/Await\" на реферата. ', 'Не е така! За повече информация по темата виж секция \"Async/Await\" на реферата. ', 'https://www.w3schools.com/js/js_async.asp', 3),
(21, '2020-11-21 14:36:00', 81271, 0, 8, 'Quiz', 'Fetch API vs. XHR?', 'Зависи', 'Fetch API', 'XHR', 'Нито едното', 1, 5, 'Супер!', 'Възможно е...!', 'https://gomakethings.com/why-i-still-use-xhr-instead-of-the-fetch-api/', 3),
(22, '2020-11-21 18:25:43', 81682, 0, 1, 'проверка до каква степен от аудиторията е чувала за React', 'Какво е React JS', 'база данни', 'библиотека за създаване на потребителски интерфейси', 'сървър', 'SDK за създаване на потребителски интерфейси', 2, 2, 'Верен отговор. Отлично! ', 'Грешка! За повече информация по темата виж началото от реферата.', 'въпрос за разчупване на леда', 1),
(23, '2020-11-26 18:01:08', 81271, 0, 9, 'FETCH API and JQuery', 'Кое не е част от разликите между Fetch API и jQuery.ajax()?', 'Дори и при използването на по-стари версии на браузърите, не е необходимо да мислим за включването на \" credentials: \'same-origin\' \"', 'Възможно е установяването на cross-site сесия с използването на fetch(). fetch() може да получава cross-site бисквитки', 'fetch() ще изпрати бисквинките само ако \" credentials: \'same-origin\' \" е set-нато', 'Promise обектът, върнат от fetch(), не би отхвърлил HTTP error status дори ако отговорът е HTTP 404 или 500, ще приключи нормално с ok стаус, set-нат на false', 1, 4, 'Отлично! За повече информация по темата виж секция \"Fetch API \"на реферата.', 'Не е така! За повече информация по темата виж секция \"Fetch API\" на реферата.', 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API', 2),
(24, '2020-11-26 18:25:08', 81271, 0, 10, 'asynchronous programming', 'Асинхронното програмиране има ред предимства. В кои от следните ситауции бихте го използвали?', 'При обработка на силно зависими данни, получени със заявка към базата ', 'Когато се целим повече към простота отклокото към ефикасност, изпълняваме по-прости и кратки операции', 'Ако има ресурси, които се използват от еднакви, зависими елементи, и много нишки, отговарящи за ресурсите и функционалността  ', 'Има случаи, в които използването на определени технологии, налага използването му, както например програмирането на Android приожения с използването на MIT App Inventor ', 1, 4, 'Отлично!', 'Не е така! ', 'https://stackify.com/when-to-use-asynchronous-programming/', 2),
(25, '2013-04-02 12:12:26', 9999, 1, 1, 'Да провери колко време отнема писането на реферат по WWW.', 'Колко време според вас отнема писането на реферат по WWW технологии?', '20+ часа', '10 часа', '5 часа', '1 час', 1, 5, 'Браво! Наистина времето за писане на един реферат е между 20 и 30 часа. Виж информацията в мудъл за разпределението по часове.', 'Далече от истината! Времето за писане на един реферат е между 20 и 30 часа. Виж информацията в мудъл за разпределението по часове.', 'Виж: http://moodle.le.tsdoit.org/pluginfile.php/842/mod_forum/attachment/139/wwwTech_Evaluation_Instructions_v3.pdf', NULL),
(41, '2021-01-20 09:18:54', 81319, 15, 1, 'Aim aim', 'Question question question question', 'Option 1, option 1', 'Option 2, option 2', 'Option 3, option 3', 'Option 4, option 4', 1, 8, 'Bravo', 'Losho', 'Note note note note', 1),
(42, '2021-01-20 09:19:09', 81319, 15, 1, 'Aim aim', 'Question question question question', 'Option 1, option 1', 'Option 2, option 2', 'Option 3, option 3', 'Option 4, option 4', 1, 8, 'Bravo', 'Losho', 'Note note note note', 1),
(43, '2021-01-20 09:19:31', 81319, 15, 1, 'Aim aim', 'Question question question question', 'Option 1, option 1', 'Option 2, option 2', 'Option 3, option 3', 'Option 4, option 4', 1, 8, 'Bravo', 'Losho', 'Note note note note', 1),
(44, '2021-01-20 09:20:59', 81319, 15, 1, 'Aim aim', 'Question question question question', 'Option 1, option 1', 'Option 2, option 2', 'Option 3, option 3', 'Option 4, option 4', 1, 8, 'Bravo', 'Losho', 'Note note note note', 1),
(45, '2021-01-20 09:22:03', 81319, 15, 1, 'Aim aim', 'Question question question question', 'Option 1, option 1', 'Option 2, option 2', 'Option 3, option 3', 'Option 4, option 4', 1, 8, 'Bravo', 'Losho', 'Note note note note', 1),
(46, '2021-01-20 09:23:32', 81319, 15, 1, 'Aim aim', 'Question question question question', 'Option 1, option 1', 'Option 2, option 2', 'Option 3, option 3', 'Option 4, option 4', 1, 8, 'Bravo', 'Losho', 'Note note note note', 1),
(47, '2021-01-20 09:23:39', 81319, 15, 1, 'Aim aim', 'Question question question question', 'Option 1, option 1', 'Option 2, option 2', 'Option 3, option 3', 'Option 4, option 4', 1, 8, 'Bravo', 'Losho', 'Note note note note', 1),
(48, '2021-01-20 09:24:37', 81319, 15, 1, 'Aim aim', 'Question question question question', 'Option 1, option 1', 'Option 2, option 2', 'Option 3, option 3', 'Option 4, option 4', 1, 8, 'Bravo', 'Losho', 'Note note note note', 1),
(49, '2021-01-20 09:25:27', 81319, 15, 1, 'Aim aim', 'Question question question question', 'Option 1, option 1', 'Option 2, option 2', 'Option 3, option 3', 'Option 4, option 4', 1, 8, 'Bravo', 'Losho', 'Note note note note', 1),
(50, '2021-01-20 09:25:53', 81319, 15, 1, 'Aim aim', 'Question question question question', 'Option 1, option 1', 'Option 2, option 2', 'Option 3, option 3', 'Option 4, option 4', 1, 8, 'Bravo', 'Losho', 'Note note note note', 1),
(51, '2021-01-20 09:26:24', 81319, 15, 1, 'Aim aim', 'Question question question question', 'Option 1, option 1', 'Option 2, option 2', 'Option 3, option 3', 'Option 4, option 4', 1, 8, 'Bravo', 'Losho', 'Note note note note', 1),
(52, '2021-01-20 09:27:44', 81319, 15, 1, 'Aim aim', 'Question question question question', 'Option 1, option 1', 'Option 2, option 2', 'Option 3, option 3', 'Option 4, option 4', 1, 8, 'Bravo', 'Losho', 'Note note note note', 1),
(53, '2021-01-20 09:37:41', 81319, 15, 1, 'Aim aim', 'Question question question question', 'Option 1, option 1', 'Option 2, option 2', 'Option 3, option 3', 'Option 4, option 4', 1, 8, 'Bravo', 'Losho', 'Note note note note', 1),
(54, '2021-01-20 09:37:42', 81319, 15, 1, 'Aim aim', 'Question question question question', 'Option 1, option 1', 'Option 2, option 2', 'Option 3, option 3', 'Option 4, option 4', 1, 8, 'Bravo', 'Losho', 'Note note note note', 1),
(55, '2021-01-20 10:11:13', 81319, 23, 1, 'Цел цел', 'Съдържание', 'Опция1', 'Опция2', 'Опция3', 'Опция4', 2, 7, 'Отлично', 'Грешка', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `question_history`
--

CREATE TABLE `question_history` (
  `questionID` int(16) NOT NULL,
  `userID` int(16) UNSIGNED NOT NULL,
  `answered` varchar(16) NOT NULL,
  `correct` tinyint(1) NOT NULL,
  `timestamp` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `question_history`
--

INSERT INTO `question_history` (`questionID`, `userID`, `answered`, `correct`, `timestamp`) VALUES
(55, 22222, 'option_1', 0, 1611604910),
(55, 22222, 'option_2', 1, 1611604910),
(55, 22222, 'option_2', 1, 1611604910),
(54, 22222, 'option_3', 0, 1611604910),
(54, 22222, 'option_4', 0, 1611604910),
(54, 22222, 'option_1', 1, 1611604910),
(53, 22222, 'option_2', 0, 1611604910),
(53, 22222, 'option_3', 0, 1611604910),
(53, 22222, 'option_4', 0, 1611604910),
(53, 22222, 'option_1', 1, 1611604910),
(55, 22222, 'option_1', 0, 1611604910),
(55, 22222, 'option_2', 1, 1611604910),
(55, 22222, 'option_2', 1, 1611604910),
(54, 22222, 'option_3', 0, 1611604910),
(54, 22222, 'option_4', 0, 1611604910),
(54, 22222, 'option_1', 1, 1611604910),
(53, 22222, 'option_2', 0, 1611604910),
(53, 22222, 'option_3', 0, 1611604910),
(53, 22222, 'option_4', 0, 1611604910),
(53, 22222, 'option_1', 1, 1611604910),
(41, 81319, 'option_1', 1, 1611604910),
(42, 81319, 'option_2', 0, 1611604910),
(43, 81319, 'option_3', 0, 1611604910),
(44, 81319, 'option_4', 0, 1611604910),
(45, 81319, 'option_1', 1, 1611604910),
(46, 81319, 'option_4', 1, 1611604910),
(47, 81319, 'option_4', 0, 1611604910),
(48, 81319, 'option_4', 0, 1611604910),
(49, 81319, 'option_3', 0, 1611604910),
(50, 81319, 'option_2', 0, 1611604910),
(51, 81319, 'option_1', 1, 1611604910),
(52, 81319, 'option_1', 1, 1611604910),
(53, 81319, 'option_1', 1, 1611604910),
(54, 81319, 'option_1', 1, 1611604910),
(41, 81319, 'option_2', 0, 1611604910),
(42, 81319, 'option_2', 0, 1611604910),
(43, 81319, 'option_3', 0, 1611604910),
(44, 81319, 'option_4', 0, 1611604910),
(45, 81319, 'option_1', 1, 1611604910),
(47, 81319, 'option_4', 0, 1611604910),
(49, 81319, 'option_3', 0, 1611604910),
(50, 81319, 'option_2', 0, 1611604910),
(52, 81319, 'option_1', 1, 1611604910),
(53, 81319, 'option_1', 1, 1611604910),
(54, 81319, 'option_1', 1, 1611604910),
(41, 81319, 'option_1', 1, 1611604910),
(42, 81319, 'option_2', 0, 1611604910),
(43, 81319, 'option_3', 0, 1611604910),
(44, 81319, 'option_4', 0, 1611604910),
(45, 81319, 'option_1', 1, 1611604910),
(46, 81319, 'option_4', 1, 1611604910),
(47, 81319, 'option_4', 0, 1611604910),
(48, 81319, 'option_4', 0, 1611604910),
(49, 81319, 'option_3', 0, 1611604910),
(50, 81319, 'option_2', 0, 1611604910),
(51, 81319, 'option_1', 1, 1611604910),
(52, 81319, 'option_1', 1, 1611604910),
(53, 81319, 'option_1', 1, 1611604910),
(54, 81319, 'option_1', 1, 1611604910);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `sessionID` int(16) NOT NULL,
  `expires` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `facultyNr` int(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`sessionID`, `expires`, `facultyNr`) VALUES
(81319, '2021-01-25 18:27:02', 81319);

-- --------------------------------------------------------

--
-- Table structure for table `test_table`
--

CREATE TABLE `test_table` (
  `item_key` varchar(30) NOT NULL,
  `item_value` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `test_table`
--

INSERT INTO `test_table` (`item_key`, `item_value`) VALUES
('test_item', 'test_value');

-- --------------------------------------------------------

--
-- Table structure for table `topic`
--

CREATE TABLE `topic` (
  `topicID` int(6) UNSIGNED NOT NULL,
  `title` text NOT NULL,
  `topicNumber` int(11) DEFAULT NULL,
  `extraInfo` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `topic`
--

INSERT INTO `topic` (`topicID`, `title`, `topicNumber`, `extraInfo`) VALUES
(0, 'Тестване', 666, 'Ще видим'),
(1, 'Изисквания', 0, 'Променят се'),
(2, 'Google - Web Performance Best ', 1, 'Заета'),
(3, 'HTML 5', 2, 'Част първа семантични тагове. Тагове за форми. Примери.'),
(4, 'Latex сравнение с HTML', 3, 'Заета'),
(5, 'CSS', 4, 'Стилове. Класове. Селектори.'),
(6, 'CSS', 5, 'Layouts. Box model.'),
(7, 'CSS', 6, 'Layouts. Flexbox.'),
(8, 'Анимации със CSS', 7, 'Използване на трансформации.'),
(9, 'Еммет синтаксис', 8, ''),
(10, 'Fetch API and XHR', 16, 'Трябва update!'),
(12, 'IP over Avian Carriers', 1990, 'https://en.wikipedia.org/wiki/IP_over_Avian_Carriers\n\nhttps://tools.ietf.org/html/rfc1149'),
(13, 'Power Rangers', 1993, 'https://en.wikipedia.org/wiki/Power_Rangers'),
(14, 'Power Rangers', 1993, 'https://en.wikipedia.org/wiki/Power_Rangers'),
(15, 'Title-1', 1000, 'Extra info for Title-1'),
(16, 'Title-2', 1001, 'Extra info for Title-2'),
(17, 'Title-3', 1003, ''),
(18, 'Тема 16', 1016, ''),
(23, 'Тема Тема Тема', 126, 'Линкове');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `facultyNr` int(16) UNSIGNED NOT NULL,
  `topicNr` int(16) UNSIGNED NOT NULL,
  `role` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`facultyNr`, `topicNr`, `role`) VALUES
(0, 0, 'admin'),
(11111, 1, 'student'),
(22222, 2, 'student'),
(33333, 3, 'student'),
(44444, 15, 'student'),
(81319, 12, 'student');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`),
  ADD KEY `topic_id` (`topic_id`);

--
-- Indexes for table `question_history`
--
ALTER TABLE `question_history`
  ADD KEY `questionID` (`questionID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sessionID`);

--
-- Indexes for table `topic`
--
ALTER TABLE `topic`
  ADD PRIMARY KEY (`topicID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`facultyNr`),
  ADD KEY `topicNr` (`topicNr`),
  ADD KEY `facultyNr` (`facultyNr`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `topic`
--
ALTER TABLE `topic`
  MODIFY `topicID` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`topicID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `question_history`
--
ALTER TABLE `question_history`
  ADD CONSTRAINT `questionID` FOREIGN KEY (`questionID`) REFERENCES `question` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `userID` FOREIGN KEY (`userID`) REFERENCES `users` (`facultyNr`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `userTopic` FOREIGN KEY (`topicNr`) REFERENCES `topic` (`topicID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
