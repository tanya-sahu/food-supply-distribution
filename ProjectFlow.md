# Real-World Food Supply & Distribution Operational Flow

This document details the lifecycle of food supply execution during a disaster response after an NGO or Disaster Management Authority approves a relief supply request.

---

## 🔄 End-to-End Execution Pipeline

### 1. Inventory Check & Warehouse Allocation
* **Trigger:** NGO approves a food relief request for a specific camp.
* **System Action:** System scans the `Inventory` table to find the nearest `Warehouse` holding sufficient stock of requested items (e.g., Wheat Flour, Water Packets).
* **Decision Rule:** If stock is insufficient in the nearest warehouse, the system plans a split allocation from multiple regional warehouses.
* **Database Tables:** `Warehouses`, `Inventory`, `Products`

---

### 2. Stock Reservation & Quantity Lock
* **Trigger:** Identification of source warehouse(s).
* **System Action:** Available inventory counts are reserved or updated to prevent double allocation by parallel camp requests.
* **Database Tables:** `Inventory` (`quantity` updated/locked)

---

### 3. Shipment Dispatch & Tracking Initialization
* **Trigger:** Physical loading of food items onto transport vehicles.
* **System Action:** A new shipment entry is generated with status `In Transit`, recording dispatch time, origin warehouse, and target camp.
* **Database Tables:** `Shipments` (`status = 'In Transit'`)

---

### 4. Last-Mile Logistics Monitoring
* **Trigger:** Transport vehicle en route to the destination.
* **System Action:** Disaster managers query active shipments via system dashboard or Natural Language AI to identify delays or urgent bottlenecks.
* **Database Tables:** `Shipments`, `ReliefCamps`

---

### 5. Delivery Verification & Inventory Handover
* **Trigger:** Vehicle arrives at the designated relief camp.
* **System Action:** Officer-in-charge verifies physical goods against requested quantities and marks shipment as `Delivered`.
* **Database Tables:** `Shipments` (`status = 'Delivered'`)

---

## 📊 Database Mapping Strategy

| Operational Stage | Primary Action | Corresponding Table(s) | Primary Attributes Involved |
| :--- | :--- | :--- | :--- |
| **Warehouse Allocation** | Query stock availability | `Inventory`, `Warehouses` | `quantity`, `min_threshold`, `location` |
| **Shipment Creation** | Create transit record | `Shipments` | `shipment_id`, `warehouse_id`, `camp_id`, `status` |
| **Camp Allocation** | Update camp status | `ReliefCamps` | `affected_people_count`, `urgency_level` |
| **Delivery Confirmation** | Complete supply lifecycle | `Shipments` | `status = 'Delivered'`, `dispatch_date` |

---

## 🤖 Natural Language Query Examples (AI Integration)

1. *"Which warehouses currently have more than 200 kg of Wheat Flour?"*
2. *"List all active shipments that are currently 'In Transit' to Critical urgency camps."*
3. *"Show total food stock dispatched to 'Flood Relief Camp 1'."*