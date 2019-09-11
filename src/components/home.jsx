import React, { Component } from "react";
import ChartjsReact from "./uiComponents/chartjsReact";
import Button from "@material-ui/core/Button";
import { logOutUser } from "../services/authUser";
export class Home extends Component {
  state = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    data: [12, 19, 3, 10, 11, 39, 46, 25, 8, 19, 35, 90]
  };
  handleLogOut = () => {
    logOutUser();
  };
  render() {
    const { labels, data } = this.state;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 50,
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <div style={{ width: "800px" }}>
          <ChartjsReact
            labels={labels}
            data={data}
            title={"Sample Month Performance"}
          ></ChartjsReact>
        </div>
        <div>
          <Button
            onClick={this.handleLogOut}
            variant="contained"
            color="primary"
          >
            LogOut
          </Button>
        </div>
      </div>
    );
  }
}

export default Home;
