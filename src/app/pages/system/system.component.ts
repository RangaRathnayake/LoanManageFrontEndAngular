import { Component, OnInit } from "@angular/core";
import { ApicallService } from "app/service/apicall.service";
import { AlartService } from "app/service/alart.service";

@Component({
  selector: "app-system",
  templateUrl: "./system.component.html",
  styleUrls: ["./system.component.scss"],
})
export class SystemComponent implements OnInit {
  rate;
  ratelist;

  daycount;
  rateperdate;

  daycountlist;
  rateperdatelist;

  keyvallist;

  projectname;
  location;
  lotcount;
  projectlist;

  constructor(private apiCall: ApicallService, private alart: AlartService) {}

  ngOnInit(): void {
    this.getrate();
    this.getwarrentdetails();
    this.getproject();
  }

  apply() {
    if (Number(this.rate) >= 0) {
      this.apiCall.post(
        "interest/save",
        {
          interest: {
            rate: this.rate,
            status: 1,
          },
        },
        (data) => {
          if (data) {
            this.alart.showNotification("success", "save");
            this.getrate();
            this.rate = undefined;
          }
        }
      );
    } else {
      this.alart.showNotification("warning", "check all feilds");
    }
  }

  getrate() {
    this.apiCall.get("interest/get", (result) => {
      this.ratelist = result;
      console.log(result);
    });
  }

  getwarrentdetails() {
    this.apiCall.get("keyval/warrant_day", (result) => {
      this.daycountlist = result;
      this.daycount = result.val;
      this.apiCall.get("keyval/warrant_rate", (results) => {
        this.rateperdatelist = results;
        this.rateperdate = results.val;
      });
    });
  }

  savewarrent() {
    if (this.daycount && this.rateperdate) {
      this.daycountlist.val = this.daycount;
      this.rateperdatelist.val = this.rateperdate;
      this.apiCall.post(
        "keyval/save",
        {
          keyval: this.daycountlist,
        },
        (data) => {
          if (data) {
            this.apiCall.post(
              "keyval/save",
              {
                keyval: this.rateperdatelist,
              },
              (data) => {
                if (data) {
                  this.getwarrentdetails();
                  this.alart.showNotification("success", "save");
                }
              }
            );
          }
        }
      );
    } else {
      this.alart.showNotification("warning", "check all feilds");
    }
  }

  saveproject() {
    if (this.projectname && this.location && this.lotcount) {
      this.apiCall.post(
        "project/save",
        {
          project: {
            name: this.projectname,
            location: this.location,
            officer: "-",
            lotCount: this.lotcount,
          },
        },
        (data) => {
          if (data) {
            this.alart.showNotification("success", "save");
            this.getproject();
            this.projectname = undefined;
            this.location = undefined;
            this.lotcount = undefined;
          }
        }
      );
    } else {
      this.alart.showNotification("warning", "check all feilds");
    }
  }

  getproject() {
    this.apiCall.get("project/get", (result) => {
      this.projectlist = result;
      console.log(result);
    });
  }
}
