/**
 * Класс Transaction наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/transaction'
 * */
class Transaction extends Entity {
    static URL = '/transaction';
}
Transaction.list({}, function(err, response) {
    if (err) {
        console.error('Transaction List Error:', err);
    } else {
        console.log('Transaction List Response:', response);
    }
});
