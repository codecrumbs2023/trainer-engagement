import BusinessRequestsDetails from "./BusinessRequestDetails";
import CompaniesDetails from "./CompaniesDetails";
import PurchaseOrderComponent from "./PurchaseOrderComponent";
import TrainersDetails from "./TrainersDetails";

function AdminDashboard() {
  return (
    <div>
      <TrainersDetails />
      <CompaniesDetails />
      <PurchaseOrderComponent />
      <BusinessRequestsDetails/>
    </div>
  );
}

export default AdminDashboard;


