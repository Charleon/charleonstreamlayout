using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using WikiReader;
using Ventuz.OSC;
using Newtonsoft.Json;
using System.IO;

namespace WindowsFormsApplication1
{
    public partial class Form1 : Form
    {
        UserActivityHook hook;
        OscManager oscmanager;


        public Form1()
        {
            InitializeComponent();

          
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            string settingsJSON = File.ReadAllText("settings.json");
            dynamic settings = JsonConvert.DeserializeObject(settingsJSON);

            try
            {
                textHost.Text = settings.host;
                textPort.Text = settings.port;
                textId.Text = settings.id;
                textOSC.Text = settings.oscaddress;

                oscmanager = new OscManager();
                oscmanager.DestIP = textHost.Text;
                oscmanager.DestPort = int.Parse(textPort.Text);

                startUp();
            }
            catch (FormatException exeption)
            {
                textOSC.Text = "JSON LOAD ERROR";
            }


        }

        private void startUp()
        {

            hook = new UserActivityHook();
            hook.KeyDown += (s, keycode, isCtrl) =>
            {
                OscElement msg = new OscElement(textOSC.Text, textId.Text, keycode.ToString());
                OscBundle bundle = new OscBundle();
                bundle.AddElement(msg);

                oscmanager.Send(bundle);


                textIndata.Text = keycode.ToString();

            };
        }
    }
}
