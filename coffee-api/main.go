// main.go
package main

import (
    "encoding/json"
    "log"
    "net/http"
)

// Coffee represents a coffee drink
type Coffee struct {
    ID          int      `json:"id"`
    Title       string   `json:"title"`
    Description string   `json:"description"`
    Ingredients []string `json:"ingredients"`
    Image       string   `json:"image"`
}

var hotCoffees = []Coffee{
    {
        ID:          1,
        Title:       "Black Coffee",
        Description: "Simple and bold—just ground beans steeped in hot water.",
        Ingredients: []string{"Coffee"},
        Image:       "https://images.unsplash.com/photo-1494314671902-399b18174975",
    },
    {
        ID:          2,
        Title:       "Latte",
        Description: "Espresso with steamed milk and a bit of foam.",
        Ingredients: []string{"Espresso", "Steamed Milk"},
        Image:       "https://images.unsplash.com/photo-1561882468-9110e03e0f78",
    },
}

var icedCoffees = []Coffee{
    {
        ID:          1,
        Title:       "Iced Coffee",
        Description: "Chilled coffee served over ice, often with milk or sweetener.",
        Ingredients: []string{"Coffee", "Ice", "Milk"},
        Image:       "https://upload.wikimedia.org/wikipedia/commons/d/d8/Blue_Bottle%2C_Kyoto_Style_Ice_Coffee.jpg",
    },
    {
        ID:          2,
        Title:       "Cold Brew",
        Description: "Coffee steeped in cold water for 12+ hours, served over ice.",
        Ingredients: []string{"Coffee", "Ice"},
        Image:       "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/ColdBrewCoffeein_Cans.png/640px-ColdBrewCoffeein_Cans.png",
    },
}

func hotHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    if err := json.NewEncoder(w).Encode(hotCoffees); err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
    }
}

func icedHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    if err := json.NewEncoder(w).Encode(icedCoffees); err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
    }
}

func main() {
    http.HandleFunc("/coffee/hot", hotHandler)
    http.HandleFunc("/coffee/iced", icedHandler)

    addr := ":3000"
    log.Printf("Starting Coffee API on %s…", addr)
    if err := http.ListenAndServe(addr, nil); err != nil {
        log.Fatalf("Server failed: %v", err)
    }
}