import { NavLink } from "react-router-dom";
import { TargetType } from "../../../Enums/Enums";
import { Image } from "react-bootstrap";

export function PersonCard({ name, date, postType, location, age, gender, image, postId }) {

    let postTypeLabel = '';
    switch (postType) {
        case TargetType.LOST:
            postTypeLabel += 'Missing ';
            break;
        case TargetType.FOUND:
            postTypeLabel += 'Found ';
            break;
    }

    return (
        <NavLink
            className="nav-link m-4 fw-bold"
            style={{ marginTop: "0.5rem" }}
            to={{ pathname: `/Person-Details/${postId}` }}
        >
            <div className="card d-flex flex-row ">
                <a >
                    <Image style={{ maxHeight: "170px" }} className="bg-white" rounded src={"data:image/jpg;base64," + image} alt="person-img" />
                </a>
                <div className="bg-white d-flex flex-column align-items-baseline h-100 pt-2 pb-2 ps-3 pe-3 rounded-1">
                    <p className="h4 text-black fw-bold ">{name}</p>
                    <p className="h5 text-black">{postTypeLabel} Since: <span className="p-0 m-0">{date}</span></p>
                    <p className="h5 text-black">{postTypeLabel} From: <span className="p-0 m-0">{location}</span></p>
                    <p className="h5 text-black">Gender: <span className="p-0 m-0">{gender}</span></p>
                    <p className="h5 text-black">Age Now: <span className="p-0 m-0">{age}</span></p>
                </div>
            </div>
        </NavLink>

    )
}