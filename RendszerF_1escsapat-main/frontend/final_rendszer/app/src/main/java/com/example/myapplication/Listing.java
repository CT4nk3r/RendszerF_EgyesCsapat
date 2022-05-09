package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import java.util.ArrayList;

public class Listing extends AppCompatActivity {
    ArrayList<Issues> tasks = new ArrayList<Issues>();
    int id;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_listing);
        Intent inter = new  Intent (this, Listing.class);
        Intent intent = getIntent();
        id = intent.getIntExtra("ID",0);
        generate();
        layDown();

    }
    public void layDown(){
        LinearLayout layout = findViewById(R.id.linearlayoutid);
        layout.removeAllViews();
        for (int i = 0;i<tasks.size();i++){
            if ((tasks.get(i).rel_id == id || tasks.get(i).rel_id == 0) && !tasks.get(i).done){
                final int j = i;
                TextView t = new TextView(this);
                t.setText("TaskNO: "+tasks.get(i).task_No);
                TextView t2 = new TextView(this);
                t2.setText("Task: "+tasks.get(i).task);
                TextView t3 = new TextView(this);
                t3.setText("Location: "+tasks.get(i).location);
                TextView t4 = new TextView(this);
                t4.setText("Be done by: "+tasks.get(i).be_done_by);
                layout.addView(t);
                layout.addView(t2);
                layout.addView(t3);
                layout.addView(t4);
                if (tasks.get(i).must_do){
                    Button b2 = new Button(this);
                    b2.setText("Elvégezve");
                    b2.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                            tasks.get(j).done = true;
                            layDown();
                        }
                    });
                    Button b3 = new Button(this);
                    b3.setText("Elutasítás");
                    b3.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                            tasks.get(j).must_do = false;
                            layDown();
                        }
                    });
                    layout.addView(b2);
                    layout.addView(b3);
                }
                else {
                    Button b1 = new Button(this);
                    b1.setText("Elfogad");
                    b1.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                            tasks.get(j).must_do = true;
                            layDown();
                        }
                    });
                    layout.addView(b1);
                }

            }
        }
    }

    public void generate(){
        tasks.add(new Issues("Tankolás","223","2022-04-26 02:00:00",21,0,false));
        tasks.add(new Issues("Vízcsere","223","2022-04-26 02:00:00",22,0,false));
        tasks.add(new Issues("Porszívózás","223","2022-04-26 02:00:00",23,0,false));

        tasks.add(new Issues("Tűzoltó készülék csere","321","2022-04-26 02:00:00",11,1,true));
        tasks.add(new Issues("Tűzoltó Kocsi Tankolása","321","2022-04-26 02:00:00",13,1,true));
        tasks.add(new Issues("Elem csere tűzjelzőben","223","2022-04-26 02:00:00",15,1,true));
        tasks.add(new Issues("Elem csere tűzjelzőben","223","2022-04-26 02:00:00",17,1,true));

        tasks.add(new Issues("Tűzltókészülék tesztelése","223","2022-04-26 02:00:00",24,2,true));
        tasks.add(new Issues("Kocsi kerékevizsgálat","223","2022-04-26 02:00:00",25,2,true));
        tasks.add(new Issues("Könyvelés","223","2022-04-26 02:00:00",26,2,true));

        tasks.add(new Issues("Könyvelés","223","2022-04-26 02:00:00",27,3,true));
        tasks.add(new Issues("Kabinet pórtalanítás","223","2022-04-26 02:00:00",28,3,true));

    }

}