import { Container, Form, InputGroup, Button, FormControl, Row, Col, Dropdown } from "react-bootstrap"
import filterIcon from '../../assets/images/filter.png'
import DropdownCheckbox from "./DropdownCheckbox"
import { useState } from "react"

const SearchArea = ({tabList}) => {

    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

    const [tempSelectedValues, setTempSelectedValues] = useState({
        subjects: [],
        level: [],
        require: [],
        area: []
    });

    const [selectedValues, setSelectedValues] = useState({
        subjects: [],
        level: [],
        require: [],
        area: []
    });

    const handleTempSelect = (field, selectedOptions) => {
        setTempSelectedValues(prevState => ({
        ...prevState,
        [field]: selectedOptions
        }));
    };

    const handleApply = () => {
        setSelectedValues(tempSelectedValues);
    };

    return (
        <Container className="mt-30">
            <div>
                <span className="listclass-title">{tabList.title}</span>
                <span className="listclass-title-sub">{`(Đang có ${tabList.numberClass} ${tabList.type})`}</span>
                <a href={tabList.href}>{tabList.hrefContent}</a>
            </div>

            <div>
                <Form className="mt-30 mb-20">
                    <InputGroup>
                    <FormControl
                        type="text"
                        placeholder="Tìm kiếm lớp gia sư"
                        aria-label="Search"
                    />
                    <Button style={{backgroundColor: "#00b050"}} type="submit">
                        Tìm kiếm
                    </Button>
                    </InputGroup>
                </Form>

                <div>
                    <div className="mt-20"> 
                        <img src={filterIcon} alt="filter Icon"></img>
                        <span className="listclass-title ml-10" style={{color: '#00b050'}}>Bộ lọc</span>
                    </div>

                    <Form className="mt-20">
                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="formGridCheckbox1">
                                    <DropdownCheckbox
                                        options={options}
                                        field="subjects"
                                        onChange={handleTempSelect}
                                        title="Chọn môn học"
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group controlId="formGridCheckbox2">
                                    <DropdownCheckbox
                                        options={options}
                                        field="level"
                                        onChange={handleTempSelect}
                                        title="Chọn cấp học"
                                    />
                                </Form.Group>
                            </Col>
                    
                            <Col>
                                <Form.Group controlId="formGridCheckbox3">
                                    <DropdownCheckbox
                                        options={options}
                                        field="require"
                                        onChange={handleTempSelect}
                                        title="Chọn yêu cầu"
                                    />
                                </Form.Group>
                            </Col>
                            
                            <Col>
                                <Form.Group controlId="formGridCheckbox4">
                                    <DropdownCheckbox
                                        options={options}
                                        field="area"
                                        onChange={handleTempSelect}
                                        title="Chọn khu vực"
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={1} style={{textAlign: "right"}}>
                                <Button style={{width: "100%", backgroundColor:"#00b050"}} onClick={handleApply}>Lọc</Button>
                            </Col>
                        </Row>
                        
                    </Form>

                </div>
            </div>

            <div className="mt-4">
                <span className="listclass-title">Bộ lọc đã được chọn:</span>
                <ul>
                    <li><p>Các môn học: {selectedValues.subjects.join(', ')}</p></li>
                    <li><p>Các cấp học: {selectedValues.level.join(', ')}</p></li>
                    <li><p>Các yêu cầu: {selectedValues.require.join(', ')}</p></li>
                    <li><p>Các khu vực: {selectedValues.area.join(', ')}</p></li>
                </ul>
               
            </div>

        </Container>
        
    )
}

    export default SearchArea