package com.example.listing;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity implements View.OnClickListener{

    LinearLayout layout;
    public int i = 0;
    public ArrayList<Issues> e = new ArrayList<Issues>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        layout = findViewById(R.id.linearlayoutid);

        e.add(new Issues(1,"abcd","abcd1","abcd2","abcd3"));
        e.add(new Issues(2,"abcde","abcde1","abcde2","abcde3"));
        for (i = 0;i<e.size();i++){

            Button button = new Button(this);
            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT,LinearLayout.LayoutParams.MATCH_PARENT);
            params.setMarginStart(10);
            params.setMarginEnd(12);
            button.setLayoutParams(params);
            button.setId(e.get(i).Number);
            button.setText(e.get(i).Name);
            button.setTextSize(25);
            button.setOnClickListener(new View.OnClickListener() {
                String id = String.valueOf(e.get(i).Number);
                String name = e.get(i).Name;
                String loc = e.get(i).Location;
                String req = e.get(i).Requirements;
                @Override
                public void onClick(View v) {
                    //switchActivities(e.get(i).Name,String.valueOf(e.get(i).Number),e.get(i).Location,e.get(i).Requirements);
                    //String n = String.valueOf(button.getText());


                    switchActivities(name,id,loc,req);

                }
            });
            layout.addView(button);
        }

    }
    public void spawnButtons(ArrayList<Issues> e){
        layout = findViewById(R.id.linearlayoutid);
        for (int i = 1;i<=e.size();i++){

            Button button = new Button(this);
            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT,LinearLayout.LayoutParams.MATCH_PARENT);
            params.setMarginStart(10);
            params.setMarginEnd(12);
            button.setLayoutParams(params);
            button.setId(e.get(i).Number);
            button.setText(e.get(i).Name+i);
            button.setTextSize(25);

            layout.addView(button);
        }
    }
    private void switchActivities(String name, String id, String loc, String req) {
        Intent intent= new Intent(this, Description.class);
        intent.putExtra("ID",name);
        intent.putExtra("Name",id);
        intent.putExtra("Location",loc);
        intent.putExtra("Requirements",req);
        startActivity(intent);
    }

    @Override
    public void onClick(View v) {

    }
}