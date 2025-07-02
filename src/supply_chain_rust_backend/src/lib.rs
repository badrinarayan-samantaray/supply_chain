use ic_cdk::api::{caller, time};
use ic_cdk_macros::{init, query, update};
use ic_cdk::storage::stable_save;
use candid::{Deserialize, CandidType};
use std::collections::HashMap;

use std::cell::RefCell;
thread_local! {
    static SUPPLY_CHAIN_DB: RefCell<SupplyChainDB> = RefCell::new(HashMap::new());
}

type Timestamp = u64;

#[derive(Clone, Debug, CandidType, Deserialize)]
struct Transaction {
    timestamp: Timestamp,
    from: String,
    to: String,
    metadata: Option<String>,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
struct Product {
    id: String,
    name: String,
    description: Option<String>,
    origin: String,
    certifications: Vec<String>,
    current_owner: String,
    history: Vec<Transaction>,
}

type SupplyChainDB = HashMap<String, Product>;

#[init]
fn init() {
    stable_save((SupplyChainDB::new(),)).unwrap();
}

#[update]
fn add_product(
    id: String,
    name: String,
    origin: String,
    certifications: Vec<String>,
    description: Option<String>,
) -> Result<(), String> {
    let caller = caller().to_text();

    SUPPLY_CHAIN_DB.with(|db| {
        let mut db = db.borrow_mut();

    if db.contains_key(&id) {
        return Err("Product with this ID already exists.".to_string());
    }

    let product = Product {
        id: id.clone(),
        name,
        origin,
        certifications,
        description,
        current_owner: caller.clone(),
        history: vec![Transaction {
            timestamp: time(),
            from: "Genesis".to_string(),
            to: caller,
            metadata: Some("Initial product creation".to_string()),
        }],

    };

    db.insert(id, product);
    Ok(())
    })
}


#[update]
fn transfer_ownership(id: String, new_owner: String, metadata: Option<String>,
) -> Result<(), String> {
    let caller = caller().to_text();

    SUPPLY_CHAIN_DB.with(|db| {
        let mut db = db.borrow_mut();

    let product = db.get_mut(&id).ok_or("Product not found.")?;
    
    if product.current_owner != caller {
        return Err("Only the current owner can transfer ownership.".to_string());
    }

    let transaction = Transaction {
        timestamp: time(),
        from: product.current_owner.clone(),
        to: new_owner.clone(),
        metadata,
    };

    product.current_owner = new_owner;
    product.history.push(transaction);
    Ok(())
    })
}

#[update]
fn add_certification(id: String, certification: String) -> Result<(), String> {
    let caller = caller().to_text();

    SUPPLY_CHAIN_DB.with(|db| {
        let mut db = db.borrow_mut();

    let product = db.get_mut(&id).ok_or("Product not found.")?;

    if product.current_owner != caller {
        return Err("Only the current owner can add certifications.".to_string());
    }
    if !product.certifications.contains(&certification) {
        product.certifications.push(certification);
    } 
    Ok(())
    })
}

#[query]
fn get_product(id: String) -> Result<Product, String> {
    SUPPLY_CHAIN_DB.with(|db| {
    db.borrow() .get(&id).cloned().ok_or("Product not found.".to_string())
    })
}


#[query]
fn get_product_history(id: String) -> Result<Vec<Transaction>, String> {
    SUPPLY_CHAIN_DB.with(|db| {
    db.borrow() .get(&id).ok_or("Product not found.".to_string())
    .map(|product|product.history.clone())
    })
}

#[query]
fn verify_ownership(id: String, owner: String) -> Result<bool, String> {
    SUPPLY_CHAIN_DB.with(|db| {
    db.borrow().get(&id).ok_or("Product not found.".to_string())
    .map(|product| product.current_owner == owner)
    })
}

#[query]
fn get_products_by_owner(owner: String) -> Vec<Product> {
    SUPPLY_CHAIN_DB.with(|db| {
    db.borrow()
        .values()
        .filter(|product| product.current_owner == owner)
        .cloned()
        .collect()
    })
}

ic_cdk::export_candid!();
