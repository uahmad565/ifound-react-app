import React from "react";
import { TargetType } from "../../Enums/Enums";
import AddTable from "../Dashboards/user/MatchPersonPosts/addTable";

export default function RenderCases(props) {

    const {  ActiveCases, setActiveCases, toast, handleDeleteActivePost, onPostManageClick, handleMarkAsResolve, activeButton, handleButtonGroupClick, postType } = props;
    return (
        <React.Fragment>
            <div className="container if-bg-color">
                <div className="p-2">
                    <h2 >My {postType === TargetType.LOST ? "Lost" : "Found"} Cases </h2>
                </div>
                <div style={{ minHeight: "80vh" }}>
                    <AddTable activeCases={ActiveCases}
                        setActiveCases={setActiveCases}
                        toast={toast}
                        handleDeleteActivePost={handleDeleteActivePost}
                        onPostManageClick={onPostManageClick}
                        handleMarkAsResolve={handleMarkAsResolve}
                        activeButton={activeButton}
                        handleButtonClick={handleButtonGroupClick}
                    />
                </div>
            </div>

        </React.Fragment >
    );
}