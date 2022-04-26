package com.example.listing;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.EditText;
import android.widget.TextView;

import java.util.ArrayList;

public class Description extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_description);
        Intent intent = getIntent();
        //Issues e = (Issues) getIntent().getSerializableExtra("data");
        String name = intent.getStringExtra("Name");
        String id = intent.getStringExtra("ID");
        String location = intent.getStringExtra("Location");
        String requirements = intent.getStringExtra("Requirements");
        EditText textname = findViewById(R.id.editText2);
        EditText textid = findViewById(R.id.editText1);
        EditText textloc = findViewById(R.id.editText3);
        EditText textreq = findViewById(R.id.editText4);
        textname.setText(name);
        textid.setText(id);
        textloc.setText(location);
        textreq.setText(requirements);
        //EditText text = findViewById(R.id.editText1);
        //text.setText("Valami");


    }
}