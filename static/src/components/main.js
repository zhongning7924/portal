"use strict";

/**************************************
 * 程序入口,定义进入其他模块的路由
 **************************************/
import App from "./App";
import HomePage from "./HomePage";
import SubPage from "./common/SubPage";
import PageExperienceCenter from "./PageExperienceCenter";
import PageHelpCenter from "./PageHelpCenter";
import User from "./helpcenter/User";
import UserGuide from "./helpcenter/UserGuide";
import UserAccount from "./helpcenter/UserAccount";
import UserServiceAgreement from "./helpcenter/UserServiceAgreement";
import Finance from "./helpcenter/Finance";
import FinanceIssue from "./helpcenter/FinanceIssue";
import FinanceBilling from "./helpcenter/FinanceBilling";
import FinanceRecharge from "./helpcenter/FinanceRecharge";
import FinanceAgreement from "./helpcenter/FinanceAgreement";
import CustomerService from "./helpcenter/CustomerService";
import PageAbout from "./PageAbout";
import Aboutus from "./about/Aboutus";
import LegalDeclaration from "./about/LegalDeclaration";
import ServiceNotice from "./about/ServiceNotice";
import Contactus from "./about/Contactus";
import AboutDetail from "./about/AboutDetail";
import MyAccount from "./account/myaccount/MyAccount";
import Account from "./account/myaccount/Account";
import EditPwd from "./account/myaccount/EditPwd";
import Forgetpwd from "./findpassword/Forgetpwd";

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var routes = (
  <Route path="/" handler={App}>
    <DefaultRoute handler={HomePage}/>
    <Route path="page" handler={SubPage}>
      <Route path="expcenter" handler={PageExperienceCenter}/>
      <Route path="helpcenter" handler={PageHelpCenter}>
        <Route name="hcuser" path="user" handler={User}>
          <DefaultRoute handler={UserGuide}/>
          <Route name="hcuseraccount" path="account" handler={UserAccount}/>
          <Route name="hcuseragreement" path="agreement" handler={UserServiceAgreement}/>
        </Route>
        <Route name="hcfinance" path="finance" handler={Finance}>
          <DefaultRoute handler={FinanceIssue}/>
          <Route name="hcfinancebilling" path="billing" handler={FinanceBilling}/>
          <Route name="hcfinancerecharge" path="recharge" handler={FinanceRecharge}/>
          <Route name="hcfinanceagreement" path="agreement" handler={FinanceAgreement}/>
        </Route>
        <Route name="hcservice" path="service" handler={CustomerService}/>
      </Route>
      <Route path="about" handler={PageAbout}>
        <Route name="auaboutus" path="aboutus" handler={Aboutus}/>
        <Route name="audeclaration" path="declaration" handler={LegalDeclaration}/>
        <Route name="aunotice" path="notice" handler={ServiceNotice}/>
        <Route name="aucontactus" path="contactus" handler={Contactus}/>
      </Route>
      <Route path="aunoticedetail" handler={AboutDetail}/>
      <Route path="myaccount" handler={MyAccount}>
        <Route name="accountpage" path="account" handler={Account}/>
        <Route name="editpwd" path="editpwd" handler={EditPwd}/>
      </Route>
    </Route>
    <Route path="forgetpwd" handler={Forgetpwd}/>
  </Route>
);

Router.run(routes, function (Handler) {
  ReactDOM.render(<Handler/>, document.getElementById("content"));
});
