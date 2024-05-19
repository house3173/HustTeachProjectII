const convertTime = (classTime) => {
    let classTimeConverted = ''

    if(classTime.timeMoring) {
        classTimeConverted = classTimeConverted + 'Các buổi sáng thứ ' + classTime.timeMoring + '. '
    }
    if(classTime.timeAfternoon) {
        classTimeConverted = classTimeConverted + 'Các buổi chiều thứ ' + classTime.timeAfternoon + '. '
    }
    if(classTime.timeEvening) {
        classTimeConverted = classTimeConverted + 'Các buổi tối thứ ' + classTime.timeEvening + '. '
    }
    if(classTime.timeDay) {
        classTimeConverted = classTimeConverted + 'Cả ngày thứ ' + classTime.timeDay + '. '
    }

    return classTimeConverted
}

export default convertTime