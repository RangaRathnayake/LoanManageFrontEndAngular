import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlartService } from "app/service/alart.service";
import { ApicallService } from "app/service/apicall.service";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.scss"],
})
export class UpdateComponent implements OnInit {
  userdata;
  userid;

  cusdetailslist;

  cusfullname;
  namewithinitial;
  nic;
  address;
  mobile;

  indeterminate = false;
  labelPosition: "before" | "after" = "after";
  disabled = false;

  getuser;

  //loan
  loanamount;
  rate;
  ratelist;
  month;
  date;
  doccharge;
  checked;
  mainid;

  // is
  isuserdetails = true;
  isloan = true;
  ischeck = false;

  dicapital;
  dianualrate;
  dimonthrate;
  diinstare;
  ditotal;
  difulltotal;

  constructor(
    private router: Router,
    private arout: ActivatedRoute,
    private apiCall: ApicallService,
    private alart: AlartService
  ) {
    this.getuser = this.apiCall.logedUser();
    this.gettate();
  }

  ngOnInit(): void {
    this.arout.params.subscribe((params) => {
      const id = params["id"];
      if (id) {
        this.getuserid(id);
        this.getloan(id);
        this.mainid = id;
      } else {
      }
    });
  }

  updatecus() {
    if (
      this.nic &&
      this.mobile &&
      this.cusfullname &&
      this.namewithinitial &&
      this.address
    ) {
      if (this.validnic() && this.vaidmobile()) {
        this.apiCall.post(
          "customer/save",
          {
            customer: {
              id: this.userid,
              fullName: this.cusfullname,
              name: this.namewithinitial,
              nic: this.nic,
              address: this.address,
              mobile: this.mobile,
              phone: this.mobile,
              project: 0,
              block: "",
              otherString: "",
              otherInt: 0,
            },
          },
          (data) => {
            if (data) {
              this.alart.showNotification("success", "save");
              this.isuserdetails = false;
            }
          }
        );
      }
    } else {
      this.alart.showNotification("warning", "check all feilds");
    }
  }

  updateloan() {
    if (
      this.date &&
      this.mainid &&
      this.loanamount &&
      Number(this.doccharge) >= 0 &&
      this.month &&
      this.rate &&
      this.dicapital &&
      this.diinstare &&
      this.ditotal
    ) {
      let dt = new Date(this.date);
      var datePipe = new DatePipe("en-US");
      let value = datePipe.transform(dt, "dd");
      this.apiCall.post(
        "main/save",
        {
          main: {
            status: 0,
            userId: this.getuser.id,
            id: Number(this.mainid),
            startDate: this.date,

            loanAmount: Number(this.loanamount).toFixed(2),
            dockCharge: this.doccharge,
            totalLoanAmount: Number(this.loanamount).toFixed(2),
            monthsCount: this.month,
            interestRate: Number(this.rate.rate) / 12,
            interestRateId: this.rate.id,
            capitalPerMonth: this.dicapital,
            interestPerMonth: this.diinstare,
            totalPerMonth: this.ditotal,
            monthlyPayDate: value,
          },
        },
        (data) => {
          if (data) {
            this.alart.showNotification("success", "save");
            this.isloan = false;
          }
        }
      );
    } else {
      this.alart.showNotification("warning", "check all feilds");
    }
  }

  getloan(id) {
    this.apiCall.get("main/" + id, (data) => {
      this.loanamount = data.totalLoanAmount;
      //   this.rate = data.interestRate;
      this.month = data.monthsCount;
      this.date = data.startDate;
      this.doccharge = data.dockCharge;
    });
  }

  gettate() {
    this.apiCall.get("interest/get", (result) => {
      this.ratelist = result;
      console.log(result);
    });
  }

  getuserid(mainid) {
    this.apiCall.get("main/" + mainid, (data) => {
      this.userid = data.customer.id;
      this.cusdetailslist = data.customer;

      this.cusfullname = data.customer.fullName;
      this.namewithinitial = data.customer.name;
      this.nic = data.customer.nic;
      this.address = data.customer.address;
      this.mobile = data.customer.mobile;
    });
  }

  vaidmobile(): boolean {
    var ismobile = false;
    if (this.mobile.length == 10 && Number(this.mobile)) {
      ismobile = true;
    } else {
      this.alart.showNotification("warning", "Enter valid mobile number");
    }
    console.log(ismobile);
    return ismobile;
  }

  validnic(): boolean {
    var isnic = false;
    if (this.nic.length >= 10 && this.nic.length <= 12) {
      isnic = true;
    } else {
      this.alart.showNotification("warning", "Enter valid nic");
    }
    return isnic;
  }

  onChange() {
    console.log(this.rate);
  }

  calloan() {
    if (
      this.loanamount &&
      Number(this.rate.rate) >= 0 &&
      this.month &&
      this.date &&
      Number(this.doccharge) >= 0
    ) {
      this.dicapital = (Number(this.loanamount) / Number(this.month)).toFixed(
        2
      );
      this.dianualrate = this.rate.rate;
      this.dimonthrate = Number(this.rate.rate / 12).toFixed(2);
      this.diinstare = Number(
        this.loanamount * (this.dimonthrate / 100)
      ).toFixed(2);
      this.ditotal = Number(this.dicapital) + Number(this.diinstare);
      this.difulltotal = Number(this.ditotal * this.month).toFixed(2);
      this.ischeck = true;
    } else {
      this.alart.showNotification("warning", "check all feilds");
    }
  }
}
