// Book
exports.GET_BOOK_QUERY = 'select * from books where book_id = $1;';
exports.GET_ALL_BOOK_QUERY = 'select book_id, to_char(registration_date, \'DD.MM.YYYY\')\n, title, author \n' +
    'from books\n' +
    'order by book_id;';
exports.CREATE_BOOK_QUERY = 'insert into books (book_id, title, author)' +
    'values((select max(book_id)+1 from books), $1, $2);';
exports.UPDATE_BOOK_QUERY = 'update books \n' +
    'set title = $1, author = $2\n' +
    'where book_id = $3;';
exports.DELETE_BOOK_QUERY = 'delete from books\n' +
    'where book_id = $1;';

// Order
exports.GET_ORDER_QUERY = 'select * \n' +
    'from orders\n' +
    'where order_id = $1;';
exports.GET_ALL_ORDER_QUERY = 'select * \n' +
    'from orders\n' +
    'order by order_id;';
exports.CREATE_ORDER_QUERY = 'insert into orders (order_id, reader_id, library_id, book_id, islongterm, isperpetual)\n' +
    'values((select max(order_id)+1 from orders), $1, $2, $3, $4, $5);';
exports.UPDATE_ORDER_QUERY = 'update orders \n' +
    'set reader_id = $1, library_id = $2, book_id = $3, close_date = $4, islongterm = $5, isperpetual = $6\n' +
    'where order_id = $7;';
exports.DELETE_ORDER_QUERY = 'delete from orders\n' +
    'where order_id = $1;';

// Event
exports.GET_EVENT_QUERY = 'select * \n' +
    'from events where event_id = $1;';
exports.GET_ALL_EVENT_QUERY = 'select * \n' +
    'from events\n' +
    'order by event_id;';
exports.CREATE_EVENT_QUERY = 'insert into events (event_id, library_id, start_date, end_date, employee_id, title, description)\n' +
    'values((select max(event_id)+1 from events), $1, $2, $3, $4, $5, $6);';
exports.UPDATE_EVENT_QUERY = 'update events \n' +
    'set library_id = $1, start_date = $2, end_date = $3, employee_id = $4, title = $5, description = $6\n' +
    'where event_id = $7;';
exports.DELETE_EVENT_QUERY = 'delete from events\n' +
    'where event_id = $1;';

// Library
exports.GET_LIBRARY_QUERY = 'select * \n' +
    'from libraries\n' +
    'where library_id = $1;';
exports.GET_ALL_LIBRARY_QUERY = 'select * \n' +
    'from libraries\n' +
    'order by library_id;';
exports.CREATE_LIBRARY_QUERY = 'insert into libraries (library_id, address)\n' +
    'values((select max(library_id)+1 from libraries), $1);';
exports.UPDATE_LIBRARY_QUERY = 'update libraries \n' +
    'set address = $1\n' +
    'where library_id = $2;';
exports.DELETE_LIBRARY_QUERY = 'delete from libraries\n' +
    'where library_id = $1;';

// Employee
exports.GET_EMPLOYEE_QUERY = 'select * \n' +
    'from employees\n' +
    'where employee_id = $1;';
exports.GET_ALL_EMPLOYEE_QUERY = 'select * \n' +
    'from employees\n' +
    'order by employee_id;';
exports.CREATE_EMPLOYEE_QUERY = 'insert into employees(employee_id, library_id, first_name, last_name, login, password, position)\n' +
    'values((select max(employee_id)+1 from employees), $1, $2, $3, $4, $5, $6);';
exports.UPDATE_EMPLOYEE_QUERY = 'update employees \n' +
    'set library_id = $1, first_name = $2, last_name = $3, login = $4, password = $5, position = $6\n' +
    'where employee_id = $7;';
exports.DELETE_EMPLOYEE_QUERY = 'delete from employees\n' +
    ' where employee_id = $1;';

// Reader
exports.GET_READER_QUERY = 'select * \n' +
    'from readers\n' +
    'where reader_id = $1;';
exports.GET_ALL_READER_QUERY = 'select * \n' +
    'from readers\n' +
    'order by reader_id;';
exports.CREATE_READER_QUERY = 'insert into readers(reader_id, first_name, last_name, login, password) values((select max(reader_id)+1 from readers), $1, $2, $3, $4);';
exports.UPDATE_READER_QUERY = 'update readers \n' +
    'set first_name = $1, last_name = $2, login = $3, password = $4\n' +
    'where reader_id = $5;';
exports.DELETE_READER_QUERY = 'delete from readers\n' +
    'where reader_id = $1;';

// Store
exports.GET_ALL_STORE_QUERY = 'select *\n' +
    'from store\n' +
    'order by library_id, book_id;';
exports.GET_STORE_QUERY = 'select *\n' +
    'from store\n' +
    'where book_id = $1, library_id = $2;'
exports.CREATE_STORE_QUERY = 'insert into store (library_id, book_id, count)\n' +
    'values($1, $2, $3);';
exports.UPDATE_STORE_QUERY = 'update store \n' +
    'set count = $1\n' +
    'where library_id = $2 and book_id = $3;';
exports.DELETE_STORE_QUERY = 'delete from store\n' +
    'where library_id = $1 and book_id = $2;';

// Login
exports.READER_LOGIN = 'SELECT * FROM check_login_and_pass_for_readers($1, $2)';
exports.EMPLOYEE_LOGIN = 'SELECT * FROM check_login_and_pass_for_employees($1, $2)';

// Statistic
exports.BOOK_STATISTIC = 'select book_id, to_char(registration_date, \'DD.MM.YYYY\'), title, author, count(orders.book_id = $1) as taken_count\n' +
    'from books join orders using(book_id) \n' +
    'where book_id = $1\n' +
    'group by books.book_id;'
exports.ORDERS_STATISTIC = 'select order_status, count(order_status)\n' +
    'from orders\n' +
    'where library_id = $1\n' +
    'group by order_status;'
exports.USER_STATISTIC = 'select CONCAT(first_name, \' \',last_name) as full_name, order_status, count(order_status)\n' +
    'from orders join readers using(reader_id)\n' +
    'where reader_id = $1\n' +
    'group by first_name, last_name, order_status;'

// Update
exports.UPDATE_QUERY = 'update orders set order_status = \'overdued\' where return_date < now()  - interval \'1 day\'  and isperpetual = false;\n' +
    'select * from orders;'
