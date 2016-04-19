var moment=require("moment");
console.log(moment(moment('2016-04-13 12:25 AM +0000', 'YYYY-MM-DD hh:mm A').format('YYYY-MM-DD')).toDate().getTime());
