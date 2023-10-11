import React from "react";
import './rangeInput.css';
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { COLORS } from "../../styles/globalColors";
import { ReactComponent as InfoSvg } from '../../components/Svgs/information.svg';

//Controlled Component
function RangeInput({
    label,
    type,
    autofocus,
    minValue,
    maxValue,
    handleMinChange,
    handleMaxChange,
    toolTipMessage
}) {

    const toolTip = (
        <Tooltip id="tooltip">
            <p className="fs-0 fw-light">{toolTipMessage}</p>
        </Tooltip>
    );

    return (
        <div>
            <label className="fs-6 fw-bold" style={{ color: COLORS.ifSpanColor }}>{label}
                {" "}
                <OverlayTrigger placement="top" overlay={toolTip}>
                    <InfoSvg />
                </OverlayTrigger>
            </label>
            <div className="d-flex align-items-center" id="range-input">
                <input
                    className="ms-1 me-1 s-ref-age-range input-field"
                    autoFocus={autofocus}
                    placeholder={"Min"}
                    value={minValue}
                    name="min"
                    type={type}
                    id="min-age"
                    onChange={handleMinChange}
                    maxLength="2"
                    style={{
                        border: "1px solid #888C8C",
                        borderRadius: "3px",
                        boxShadow: "0 1px 2px rgba(15,17,17,.15) inset"
                    }}
                />
                <span className="dash-line"></span>
                <input
                    className="ms-1 me-1 s-ref-age-range input-field"
                    autoFocus={autofocus}
                    placeholder={"Max"}
                    value={maxValue}
                    name="max"
                    type={type}
                    id="max-age"
                    onChange={handleMaxChange}
                    maxLength="2"
                    style={{
                        border: "1px solid #888C8C",
                        borderRadius: "3px",
                        boxShadow: "0 1px 2px rgba(15,17,17,.15) inset"
                    }}
                />
            </div>
        </div>
    );
}



export default RangeInput;
