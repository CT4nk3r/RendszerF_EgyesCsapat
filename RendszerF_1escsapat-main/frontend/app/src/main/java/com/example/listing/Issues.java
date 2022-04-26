package com.example.listing;

public class Issues {

    public int Number;
    public String Name;
    public String Location;
    public String Category;
    public String Requirements;
    public Issues(int n,String nam,String loc,String cat,String req) {
        Number = n;
        Name = nam;
        Location = loc;
        Category = cat;
        Requirements = req;
    }
    public String getName(){
        return Name;
    }
}
