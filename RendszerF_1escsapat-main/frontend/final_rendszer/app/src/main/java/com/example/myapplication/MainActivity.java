package com.example.myapplication;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Intent intent = new Intent(this,Listing.class);
        ArrayList<Users> users = new ArrayList<Users>();
        users.add(new Users("BM9PC7","password",1)); //Bősze
        users.add(new Users("AGC69U","password",2)); //Benji
        users.add(new Users("AWP2NA","password",3)); //én
        Button login = findViewById(R.id.button);
        AlertDialog.Builder dlgAlert  = new AlertDialog.Builder(this);
        login.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View view) {
                EditText passe = findViewById(R.id.editTextTextPassword);
                String pass = passe.getText().toString();
                EditText ide =findViewById(R.id.editTextTextPersonName);
                String id = ide.getText().toString();
                int i = 0;
                boolean found = false;
                int where = 0;
                for (i = 0;i<users.size();i++){
                    if (pass.equals("password") && users.get(i).name.equals(id)){
                        //intent.putExtra("ID",users.get(i).id);
                        found =true;
                        where = i;
                        //startActivity(intent);
                    }
                }

                if(i == users.size() && !found){
                    dlgAlert.setMessage("Wrong username or password!!!");
                    dlgAlert.setTitle("Error Message...");
                    dlgAlert.setPositiveButton("OK", null);
                    dlgAlert.setCancelable(true);
                    dlgAlert.create().show();
                }
                else{
                    Intent intent1 = new Intent(MainActivity.this,Listing.class);
                    intent1.putExtra("ID",users.get(where).id);
                    startActivity(intent1);
                }



            }
        });
    }
}