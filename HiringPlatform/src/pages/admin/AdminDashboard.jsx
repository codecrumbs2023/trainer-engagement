import BusinessRequestsDetails from "./BusinessRequestDetails";
import CompaniesDetails from "./CompaniesDetails";
import PurchaseOrderComponent from "./PurchaseOrderComponent";
import TrainersDetails from "./TrainersDetails";
import TrainersFilterPage from "./TrainersFilterPage";

function AdminDashboard() {
  return (
    <div>
      <TrainersDetails />
      <CompaniesDetails />
      <TrainersFilterPage/>
      <BusinessRequestsDetails/>
      <PurchaseOrderComponent />

    </div>
  );
}

export default AdminDashboard;


