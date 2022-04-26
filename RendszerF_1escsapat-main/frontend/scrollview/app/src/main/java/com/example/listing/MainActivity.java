package com.example.listing;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.Button;
import android.widget.LinearLayout;

public class MainActivity extends AppCompatActivity {

    LinearLayout layout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        layout = findViewById(R.id.linearlayoutid);

        for (int i = 1;i<=40;i++){

            Button button = new Button(this);
            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT,LinearLayout.LayoutParams.MATCH_PARENT);
            params.setMarginStart(10);
            params.setMarginEnd(12);
            button.setLayoutParams(params);
            button.setId(i);
            button.setText("Button "+i);
            button.setTextSize(25);

            layout.addView(button);
        }
    }
}