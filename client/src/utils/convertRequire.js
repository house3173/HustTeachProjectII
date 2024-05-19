const convertRequire = (classRequire) => {
    const roles = {
        '0': 'Sinh viên',
        '1': 'Giáo viên',
        '2': 'SV/GV'
      };
    
      const genders = {
        '0': 'Nam',
        '1': 'Nữ',
        '2': 'Nam, Nữ'
      };
    
      const role = roles[classRequire[0]] || 'Không xác định';
      const gender = genders[classRequire[1]] || 'Không xác định';
      const experience = classRequire.slice(2) === '0' ? 'không yêu cầu kinh nghiệm' :  classRequire.slice(2) + ' năm kinh nghiệm trở lên'

    const classRequireConverted = `${role} ${gender}, ${experience}`

    return classRequireConverted
}

export default convertRequire