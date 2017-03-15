function SM_SQL(){
}

SM_SQL.book_likeBookRecommends = function (bookId) {
	var sql = "select * from study_books inner join";
	sql += " (select study_book_id , count(study_book_id) from study_book_records where study_book_id != " ;
	sql += bookId;
	sql += " and  exists(select distinct study_user_id from study_book_records  where study_book_id = ";
	sql += bookId;
	sql += ") group by study_book_id order by count desc limit 10) b on study_books.id = b.study_book_id order by b.count "; 
	console.log(sql);
	return sql;
}
SM_SQL.book_hotDownloads = function () {
	var sql = "select * from study_books inner join ";
	sql += "(select study_book_id, count(study_book_id) from study_book_records group by study_book_id order by count desc) b "
	sql += " on study_books.id = b.study_book_id order by b.count";
	return sql;
}
module.exports = SM_SQL;