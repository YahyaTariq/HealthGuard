package main

import (
    "encoding/json"
    "fmt"
    "github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// Define the Smart Contract structure
type HealthcareContract struct {
    contractapi.Contract
}

// Define the Patient structure
type Patient struct {
    ID          string `json:"ID"`
    Name        string `json:"Name"`
    MedicalData string `json:"MedicalData"` // IPFS hash
    AccessList  []string `json:"AccessList"` // List of Healthcare Provider IDs
}

// Initialize the ledger with some patients
func (hc *HealthcareContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
    patients := []Patient{
        {ID: "patient1", Name: "John Doe", MedicalData: "", AccessList: []string{}},
        {ID: "patient2", Name: "Jane Smith", MedicalData: "", AccessList: []string{}},
    }

    for _, patient := range patients {
        patientJSON, err := json.Marshal(patient)
        if err != nil {
            return err
        }

        err = ctx.GetStub().PutState(patient.ID, patientJSON)
        if err != nil {
            return fmt.Errorf("failed to put to world state. %v", err)
        }
    }

    return nil
}

// Register a new patient
func (hc *HealthcareContract) RegisterPatient(ctx contractapi.TransactionContextInterface, id string, name string) error {
    patient := Patient{
        ID:          id,
        Name:        name,
        MedicalData: "",
        AccessList:  []string{},
    }

    patientJSON, err := json.Marshal(patient)
    if err != nil {
        return err
    }

    return ctx.GetStub().PutState(id, patientJSON)
}

// Grant access to a healthcare provider
func (hc *HealthcareContract) GrantAccess(ctx contractapi.TransactionContextInterface, patientID string, providerID string) error {
    patientJSON, err := ctx.GetStub().GetState(patientID)
    if err != nil {
        return fmt.Errorf("failed to read from world state: %v", err)
    }
    if patientJSON == nil {
        return fmt.Errorf("patient %s does not exist", patientID)
    }

    var patient Patient
    err = json.Unmarshal(patientJSON, &patient)
    if err != nil {
        return err
    }

    // Check if provider already has access
    for _, id := range patient.AccessList {
        if id == providerID {
            return fmt.Errorf("provider %s already has access", providerID)
        }
    }

    patient.AccessList = append(patient.AccessList, providerID)

    updatedPatientJSON, err := json.Marshal(patient)
    if err != nil {
        return err
    }

    return ctx.GetStub().PutState(patientID, updatedPatientJSON)
}

// Revoke access from a healthcare provider
func (hc *HealthcareContract) RevokeAccess(ctx contractapi.TransactionContextInterface, patientID string, providerID string) error {
    patientJSON, err := ctx.GetStub().GetState(patientID)
    if err != nil {
        return fmt.Errorf("failed to read from world state: %v", err)
    }
    if patientJSON == nil {
        return fmt.Errorf("patient %s does not exist", patientID)
    }

    var patient Patient
    err = json.Unmarshal(patientJSON, &patient)
    if err != nil {
        return err
    }

    // Remove providerID from AccessList
    updatedAccessList := []string{}
    found := false
    for _, id := range patient.AccessList {
        if id == providerID {
            found = true
            continue
        }
        updatedAccessList = append(updatedAccessList, id)
    }

    if !found {
        return fmt.Errorf("provider %s does not have access", providerID)
    }

    patient.AccessList = updatedAccessList

    updatedPatientJSON, err := json.Marshal(patient)
    if err != nil {
        return err
    }

    return ctx.GetStub().PutState(patientID, updatedPatientJSON)
}

// Add medical data to a patient's record
func (hc *HealthcareContract) AddMedicalData(ctx contractapi.TransactionContextInterface, patientID string, dataHash string) error {
    patientJSON, err := ctx.GetStub().GetState(patientID)
    if err != nil {
        return fmt.Errorf("failed to read from world state: %v", err)
    }
    if patientJSON == nil {
        return fmt.Errorf("patient %s does not exist", patientID)
    }

    var patient Patient
    err = json.Unmarshal(patientJSON, &patient)
    if err != nil {
        return err
    }

    patient.MedicalData = dataHash

    updatedPatientJSON, err := json.Marshal(patient)
    if err != nil {
        return err
    }

    return ctx.GetStub().PutState(patientID, updatedPatientJSON)
}

// Get patient data
func (hc *HealthcareContract) GetPatient(ctx contractapi.TransactionContextInterface, patientID string) (*Patient, error) {
    patientJSON, err := ctx.GetStub().GetState(patientID)
    if err != nil {
        return nil, fmt.Errorf("failed to read from world state: %v", err)
    }
    if patientJSON == nil {
        return nil, fmt.Errorf("patient %s does not exist", patientID)
    }

    var patient Patient
    err = json.Unmarshal(patientJSON, &patient)
    if err != nil {
        return nil, err
    }

    return &patient, nil
}

// ListAllPatients retrieves all patients from the ledger
func (hc *HealthcareContract) ListAllPatients(ctx contractapi.TransactionContextInterface) ([]Patient, error) {
    resultsIterator, err := ctx.GetStub().GetStateByRange("", "")
    if err != nil {
        return nil, fmt.Errorf("failed to get state by range: %v", err)
    }
    defer resultsIterator.Close()

    var patients []Patient
    for resultsIterator.HasNext() {
        queryResponse, err := resultsIterator.Next()
        if err != nil {
            return nil, err
        }

        var patient Patient
        err = json.Unmarshal(queryResponse.Value, &patient)
        if err != nil {
            return nil, err
        }

        patients = append(patients, patient)
    }

    return patients, nil
}

// DeletePatient removes a patient's record from the ledger
func (hc *HealthcareContract) DeletePatient(ctx contractapi.TransactionContextInterface, patientID string) error {
    patientJSON, err := ctx.GetStub().GetState(patientID)
    if err != nil {
        return fmt.Errorf("failed to read from world state: %v", err)
    }
    if patientJSON == nil {
        return fmt.Errorf("patient %s does not exist", patientID)
    }

    return ctx.GetStub().DelState(patientID)
}


// GetAccessList retrieves the access list for a specific patient
func (hc *HealthcareContract) GetAccessList(ctx contractapi.TransactionContextInterface, patientID string) ([]string, error) {
    patientJSON, err := ctx.GetStub().GetState(patientID)
    if err != nil {
        return nil, fmt.Errorf("failed to read from world state: %v", err)
    }
    if patientJSON == nil {
        return nil, fmt.Errorf("patient %s does not exist", patientID)
    }

    var patient Patient
    err = json.Unmarshal(patientJSON, &patient)
    if err != nil {
        return nil, err
    }

    return patient.AccessList, nil
}


func main() {
    chaincode, err := contractapi.NewChaincode(&HealthcareContract{})

    if err != nil {
        fmt.Printf("Error create healthcare chaincode: %s", err.Error())
        return
    }

    if err := chaincode.Start(); err != nil {
        fmt.Printf("Error starting healthcare chaincode: %s", err.Error())
    }
}

