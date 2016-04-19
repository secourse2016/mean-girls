var moment=require("moment");
console.log(moment(moment('2016-04-20 12:25 AM', 'YYYY-MM-DD hh:mm A')).format('YYYY-MM-DD') == moment(1461110400000).format("YYYY-MM-DD"));
